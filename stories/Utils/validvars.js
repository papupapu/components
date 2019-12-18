/**
  * @desc check if a variable is an object
  *
  * @param {any} x variable to be checked
  *
  * @returns {boolean} is the variable an object?
*/
export const isObject = (x) => typeof x === 'object';

/**
  * @desc check if a variable is a string
  *
  * @param {any} x variable to be checked
  *
  * @returns {boolean} is the variable a string?
*/
export const isString = (x) => typeof x === 'string';

/**
  * @desc check if a variable is not undefined nor null
  *
  * @param {any} x variable to be checked
  *
  * @returns {boolean} is the variable a valid one?
*/
export const isValidVar = (x) => typeof x !== 'undefined' && x !== null;

/**
  * @desc check if a variable is a string and it is not empty
  *
  * @param {any} x variable to be checked
  *
  * @returns {boolean} is the variable a valid string?
*/
export const isValidString = (x) => isValidVar(x) && isString(x) && x !== '';
