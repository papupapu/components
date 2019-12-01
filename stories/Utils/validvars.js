export const isValidVar = (x) => typeof x !== 'undefined' && x !== null;
export const isValidString = (x) => isValidVar(x) && typeof x === 'string' && x !== '';
