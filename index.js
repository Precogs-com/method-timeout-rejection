'use strict';

class MethodTimeOutError extends Error {
  constructor(time) {
    super();
    this.name = 'MethodTimeOutError';
    this.message = `Method timed out after ${time} ms.`;
  }
}

const MethodTimeoutRejection = function MethodTimeoutRejection(time) {
  this.time = time;
  this.isExpired = false;
};

MethodTimeoutRejection.prototype.timeoutRejection = function (method) {
  return Promise.race([
    new Promise((resolve, reject) => setTimeout(() => {
      this.isExpired = true;
      return reject(new MethodTimeOutError(this.time));
    }, this.time)),
    new Promise((resolve, reject) => method((err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    })),
  ]);
};

MethodTimeoutRejection.prototype.hasExpired = function () {
  return (this.isExpired);
};

module.exports = MethodTimeoutRejection;
module.exports.MethodTimeOutError = MethodTimeOutError;
