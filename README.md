# method timeout rejection

> Reject method (encapsulate in a promise) if it takes more than a set duration

### Usage

Constructor defines a timeout in milliseconds.
```javascript
const MethodTimeoutRejection = require('method-timeout-rejection');

const methodTimeout = new MethodTimeoutRejection(1000);
```

Method `timeoutRejection` wraps a callback in a promise and define a timeout in milliseconds.
If the callback return something in that time then it acts in the exact same way as
the original callback, otherwise it's rejected with a specific `MethodTimeOutError` error.

```javascript
methodTimeout.timeoutRejection((callback) => {
  setTimeout(() => {
    callback(null, 'hello');
  }, 2000);
})
.catch((err) => {
  assert(err instanceof MethodTimeoutRejection.MethodTimeOutError);
});
```

Method `hasExpired` just returns true if inside the timeoutRejection method, the global callback has timeout.
