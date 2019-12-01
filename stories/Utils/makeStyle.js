export default (stateStyle, propsStyle) => {
  let styleToApply = stateStyle;
  if (propsStyle) {
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
