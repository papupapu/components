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
export const isValidString = (x) => isValidVar(x) && typeof x === 'string' && x !== '';
