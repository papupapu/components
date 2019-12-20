import { createContext } from 'react';
import { isValidVar, isObject, isValidString } from '../Utils/validvars';

const galleryThemes = {
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
      galleryThemes[customThemeName] = customTheme;
    }
  }
  const galleryContext = isValidString(customThemeName) && customThemeName in galleryThemes
    ? galleryThemes[customThemeName]
    : galleryThemes.default;
  return createContext(galleryContext);
};
