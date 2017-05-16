'use strict'

const assert = require('assert')

const MethodTimeoutRejection = require('./')

describe('timeouts', () => {
  it('should resolve', (done) => {
    const value = 'hello world';
    const timeout = 1000;

    const methodTimeout = new MethodTimeoutRejection(timeout);
    let hasExpired = false;

    methodTimeout.timeoutRejection((callback) => {
      setTimeout(() => {
        hasExpired = methodTimeout.hasExpired();
        callback(null, value);
      }, 500);
    })
    .then((output) => {
      assert(hasExpired === false);
      assert(output === value);
      done();
    })
    .catch(() => {
      assert(false);
      done();
    });
  });

  it('should reject with callback error', (done) => {
    const value = 'hello world 2';
    const timeout = 1000;

    const methodTimeout = new MethodTimeoutRejection(timeout);
    let hasExpired = false;

    methodTimeout.timeoutRejection((callback) => {
      setTimeout(() => {
        hasExpired = methodTimeout.hasExpired();
        callback(new Error(value));
      }, 600);
    })
    .then(() => {
      assert(false);
      done();
    })
    .catch((err) => {
      assert(hasExpired === false);
      assert(err.message === value);
      done();
    });
  });

  it('should reject with time out error', (done) => {
    const value = 'hello world 3';
    const timeout = 1000;

    const methodTimeout = new MethodTimeoutRejection(timeout);
    let hasExpired = false;

    methodTimeout.timeoutRejection((callback) => {
      setTimeout(() => {
        hasExpired = methodTimeout.hasExpired();
        callback(null, value);
      }, 1500);
    })
    .then(() => {
      assert(false);
      done();
    })
    .catch(err => {
      setTimeout(() => {
        assert(hasExpired === true);
        assert(err instanceof MethodTimeoutRejection.MethodTimeOutError);
        done();
      }, 600);
    });
  });

  it('should reject with time out error (even if error)', (done) => {
    const value = 'hello world 4';
    const timeout = 1000;

    const methodTimeout = new MethodTimeoutRejection(timeout);
    let hasExpired = false;

    methodTimeout.timeoutRejection((callback) => {
      setTimeout(() => {
        hasExpired = methodTimeout.hasExpired();
        callback(new Error(value));
      }, 1500);
    })
    .then(() => {
      assert(false);
      done();
    })
    .catch((err) => {
      setTimeout(() => {
        assert(hasExpired === true);
        assert(err instanceof MethodTimeoutRejection.MethodTimeOutError);
        done();
      }, 600);
    });
  });
})
