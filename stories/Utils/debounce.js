/**
  * @desc limit the amount of times a function is called to avoid
  *       capturing events every single time they fire
  *
  * @param {functions} fn function to be called once the events has been fired the last time
  * @param {time} number timeout value
  *
  * @returns {function} method that will be called everytime the debounce method is called
  *
  * https://medium.com/@TCAS3/debounce-deep-dive-javascript-es6-e6f8d983b7a1
*/
export default (fn, time) => {
  let timeout;
  // eslint-disable-next-line func-names
  return function () {
    /**
     * this: keeps context
     * arguments: method to be debounced original arguments
    */
    // eslint-disable-next-line prefer-rest-params
    const functionCall = () => fn.apply(this, arguments);
    /**
     * if timeout is already defined when the event fires, clear it
    */
    clearTimeout(timeout);
    /**
     * fire the method to be debounced after the defined amount of time
    */
    timeout = setTimeout(functionCall, time);
  };
};

/*

More stylish version to test

export default (fn, tm = 0) => {
  let timeout;

  return (...args) => {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), tm);
  };
};
*/
