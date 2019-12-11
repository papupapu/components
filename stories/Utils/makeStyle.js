/**
  * @desc compose a DOMElement inline css style definition
  *
  * @param {object} stateStyle inline css style definition based on component logic
  * @param {object} propsStyle inline css style definition passed to the component with props
  *
  * @returns {object} DOMElement inline css style definition
*/
export default (stateStyle, propsStyle) => {
  let styleToApply = stateStyle;
  /**
   * in case the component received inline css style definition with props
  */
  if (propsStyle) {
    /**
     * in case the inline css style definition that came with props
     * is an array, the second element of the array is a boolean
     * specifing if the props style definitions should override
     * the state style definitions
    */
    if (Array.isArray(propsStyle)) {
      if (
        propsStyle.length > 1
        && propsStyle[1] === true
      ) {
        styleToApply = { ...styleToApply, ...propsStyle[0] };
      } else {
        styleToApply = { ...propsStyle[0], ...styleToApply };
      }
    } else {
      styleToApply = { ...propsStyle, ...styleToApply };
    }
  }
  return styleToApply;
};
