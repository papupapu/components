/**
  * @desc limit the amount of times a function is called to avoid
  *       capturing events every single time they fire
  *
  * @param {function} fn function to be called once the events has been fired the last time
  * @param {time} number timeout value
  *
  * @returns {function} method that will be called everytime the debounce method is called
  *
  * https://medium.com/@TCAS3/debounce-deep-dive-javascript-es6-e6f8d983b7a1
*/
export default (fn, tm = 0) => {
  let timeout;

  return (...args) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => fn(...args), tm);
  };
};
