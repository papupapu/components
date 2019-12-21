import { createContext } from 'react';
import { isValidVar, isObject, isValidString } from '../Utils/validvars';

const sliderThemes = {
  default: {},
};

export default (custom) => {
  let customThemeName = '';
  if (
    isValidVar(custom)
    && isObject(custom)
  ) {
    // eslint-disable-next-line prefer-destructuring
    customThemeName = Object.keys(custom)[0];
    const customTheme = custom[customThemeName];
    if (
      isValidVar(customTheme)
      && isObject(customTheme)
      && isValidString(customThemeName)
    ) {
      sliderThemes[customThemeName] = customTheme;
    }
  }
  const sliderContext = isValidString(customThemeName) && customThemeName in sliderThemes
    ? sliderThemes[customThemeName]
    : sliderThemes.default;
  return createContext(sliderContext);
};
