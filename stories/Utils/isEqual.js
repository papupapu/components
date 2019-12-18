/* eslint-disable eqeqeq */
/* eslint-disable no-self-compare */
/* eslint-disable no-plusplus */
import { isObject } from './validvars';

const { isArray } = Array;
const keyList = Object.keys;
const hasProp = Object.prototype.hasOwnProperty;

/**
  * @desc deep comparison between two variables
  *
  * @param {any} a first variable to compare
  * @param {any} b second variable to compare
  *
  * @returns {boolean} are the two variables to check equal?
  *
  * inspired by lodash library
*/
export default function equal(a, b) {
  if (a === b) return true;

  if (a && b && isObject(a) && isObject(b)) {
    const arrA = isArray(a);
    const arrB = isArray(b);
    let i;
    let length;
    let key;

    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;) { if (!equal(a[i], b[i])) return false; }
      return true;
    }

    if (arrA != arrB) return false;

    const keys = keyList(a);
    length = keys.length;

    if (length !== keyList(b).length) { return false; }

    for (i = length; i-- !== 0;) { if (!hasProp.call(b, keys[i])) return false; }

    for (i = length; i-- !== 0;) {
      key = keys[i];
      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  return a !== a && b !== b;
}
