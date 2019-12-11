import { isValidVar } from './validvars';

const validMeasureUnits = ['px', '%', 'em', 'rem'];
const defaultMeasureUnit = 'px';

/**
  * @desc check if a string ends with a measure unit
  *
  * @param {string} value string to check
  * @param {array || string} unit array of measure units specified in configuration
  *                               or single measure unit to check for
  *
  * @returns {bolean} does the string end with a measure unit?
*/
const endsWithMeasureUnit = (value, unit) => {
  if (Array.isArray(unit)) {
    return unit.filter(
      (u) => value.indexOf(u) > -1 && value.indexOf(u) === value.length - u.length,
    ).length > 0;
  }
  return value.indexOf(unit) > -1 && value.indexOf(unit) === value.length - unit.length;
};

/**
  * @desc ensure a size value has the correct measure unit
  *
  * @param {number || string} size size value to handle
  * @param {string} unit optional - the supposed measure unit to apply
  *
  * @returns {string} size value with the desidered measure unit
  *
  * TODO:
  * - if size is a string and it ends with a measure unit
  *   that is not the desidered one,replace it
  * - if size is a string and it does not end with a measure unit
  *   check if it is a number before adding the desidered measure unit
*/
export default (size, unit = null) => {
  if (isValidVar(size)) {
    /**
     * if unit is not defined, apply the default measure unit specified in configuration
    */
    const defaultUnit = unit || defaultMeasureUnit;
    /**
     * if size is a number, add the measure unit
    */
    if (typeof size === 'number') {
      return `${size}${defaultUnit}`;
    }
    /**
     * if size is a string
    */
    if (typeof size === 'string') {
      /**
       * check if it ends with a valid measure unit and in case return it
      */
      if (endsWithMeasureUnit(size, validMeasureUnits)) {
        return size;
      }
      /**
       * otherwise, add the measure unit
      */
      return `${size}${defaultUnit}`;
    }
  }
  return null;
};
