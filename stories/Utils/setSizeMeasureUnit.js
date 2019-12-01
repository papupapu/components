import { isValidVar } from './validvars';

const validMeasureUnits = ['px', '%', 'em', 'rem'];
const defaultMeasureUnit = 'px';
const endsWithMeasureUnit = (value, unit) => {
  if (Array.isArray(unit)) {
    return unit.filter(
      (u) => value.indexOf(u) > -1 && value.indexOf(u) === value.length - u.length,
    ).length > 0;
  }
  return value.indexOf(unit) > -1 && value.indexOf(unit) === value.length - unit.length;
};

export default (size, unit = null) => {
  if (isValidVar(size)) {
    const defaultUnit = unit || defaultMeasureUnit;
    if (typeof size === 'number') {
      return `${size}${defaultUnit}`;
    }
    if (typeof size === 'string') {
      if (endsWithMeasureUnit(size, validMeasureUnits)) {
        return size;
      }
      return `${size}${defaultUnit}`;
    }
  }
  return null;
};
