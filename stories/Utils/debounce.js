// https://medium.com/@TCAS3/debounce-deep-dive-javascript-es6-e6f8d983b7a1

export default (fn, time) => {
  let timeout;
  // eslint-disable-next-line func-names
  return function () {
    // eslint-disable-next-line prefer-rest-params
    const functionCall = () => fn.apply(this, arguments);
    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};
