export const mainCls = 'gallery';
export const sliderCls = '__slider';
export const buttonCls = '__button';
export default {
  [mainCls]: {
    position: (props) => props.galleryPosition || null,
    background: (props) => props.galleryBackground || null,
  },
  [`${mainCls}${sliderCls}`]: {
    position: (props) => props.galleryPosition || 'relative',
  },
  [`${mainCls}${buttonCls}`]: {
    position: (props) => props.galleryButtonPosition || null,
    width: (props) => props.galleryButtonWidth || null,
    height: (props) => props.galleryButtonHeight || null,
    color: (props) => props.galleryButtonColor || null,
    fontSize: (props) => props.galleryButtonFontSize || null,
    fontFamily: (props) => props.galleryButtonFontFamily || null,
    lineHeight: (props) => props.galleryButtonLineHeight || null,
    textAlign: (props) => props.galleryButtonTextAlign || null,
    background: (props) => props.galleryButtonBackground || null,
    border: (props) => props.galleryButtonBorder || null,
    borderRadius: (props) => props.galleryButtonBorderRadius || null,
    '&.prev': {
      top: (props) => props.galleryPrevButtonTop || null,
      left: (props) => props.galleryPrevButtonLeft || null,
      next: (props) => props.galleryPrevButtonLeft || null,
      transform: (props) => props.galleryPrevButtonTransform || null,
    },
    '&.next': {
      top: (props) => props.galleryNextButtonTop || null,
      left: (props) => props.galleryNextButtonLeft || null,
      right: (props) => props.galleryNextButtonLeft || null,
      transform: (props) => props.galleryPrevButtonTransform || null,
    },
  },
};
