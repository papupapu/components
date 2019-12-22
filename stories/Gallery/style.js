export const mainCls = 'gallery';
export const sliderCls = '__slider';
export const buttonCls = '__button';
export const counterCls = '__counter';
export default {
  [mainCls]: {
    position: (props) => props.galleryPosition || null,
    background: (props) => props.galleryBackground || null,
  },
  [`${mainCls}${sliderCls}`]: {
    position: (props) => props.galleryPosition || 'relative',
  },
  [`${mainCls}${buttonCls}`]: {
    display: (props) => props.galleryButtonDisplay || null,
    position: (props) => props.galleryButtonPosition || null,
    width: (props) => props.galleryButtonWidth || null,
    height: (props) => props.galleryButtonHeight || null,
    fontSize: (props) => props.galleryButtonFontSize || null,
    lineHeight: (props) => props.galleryButtonLineHeight || null,
    fontFamily: (props) => props.galleryButtonFontFamily || null,
    color: (props) => props.galleryButtonColor || null,
    textAlign: (props) => props.galleryButtonTextAlign || null,
    background: (props) => props.galleryButtonBackground || null,
    border: (props) => props.galleryButtonBorder || null,
    borderRadius: (props) => props.galleryButtonBorderRadius || null,
    '&.prev': {
      top: (props) => props.galleryPrevButtonTop || null,
      right: (props) => props.galleryPrevButtonLeft || null,
      bottom: (props) => props.galleryPrevButtonBottom || null,
      left: (props) => props.galleryPrevButtonLeft || null,
      transform: (props) => props.galleryPrevButtonTransform || null,
    },
    '&.next': {
      top: (props) => props.galleryNextButtonTop || null,
      right: (props) => props.galleryNextButtonLeft || null,
      bottom: (props) => props.galleryNextButtonBottom || null,
      left: (props) => props.galleryNextButtonLeft || null,
      transform: (props) => props.galleryPrevButtonTransform || null,
    },
  },
  [`${mainCls}${counterCls}`]: {
    display: (props) => props.galleryCounterDisplay || null,
    position: (props) => props.galleryCounterPosition || null,
    top: (props) => props.galleryCounterTop || null,
    right: (props) => props.galleryCounterRight || null,
    bottom: (props) => props.galleryCounterBottom || null,
    left: (props) => props.galleryCounterLeft || null,
    width: (props) => props.galleryCounterWidth || null,
    height: (props) => props.galleryCounterHeight || null,
    fontSize: (props) => props.galleryCounterFontSize || null,
    lineHeight: (props) => props.galleryCounterLineHeight || null,
    fontFamily: (props) => props.galleryCounterFontFamily || null,
    color: (props) => props.galleryCounterColor || null,
    textAlign: (props) => props.galleryCounterTextAlign || null,
    background: (props) => props.galleryCounterBackground || null,
    border: (props) => props.galleryCounterBorder || null,
    borderRadius: (props) => props.galleryCounterBorderRadius || null,
  },
};
