import { isValidString } from './validvars';

/**
  * @desc compose a DOMElement css className
  *
  * @param {array} clsArray array of strings
  *
  * @returns {string || null} DOMElement css className || null
*/
export default (clsArray) => {
  const cls = clsArray.filter(Boolean).join(' ');
  if (isValidString(cls)) {
    return cls;
  }
  return null;
};
