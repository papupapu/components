/**
  * @desc compose a DOMElement css className
  *
  * @param {array} clsArray array of strings
  *
  * @returns {string} DOMElement css className
*/
export default (clsArray) => clsArray.filter(Boolean).join(' ');
