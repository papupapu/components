import { createContext } from 'react';
import { isValidVar, isObject, isValidString } from './validvars';

const Themes = {
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
      Themes[customThemeName] = customTheme;
    }
  }
  const themeContext = isValidString(customThemeName) && customThemeName in Themes
    ? Themes[customThemeName]
    : Themes.default;
  return createContext(themeContext);
};
