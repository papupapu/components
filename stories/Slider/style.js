export const mainCls = 'slider';
export const carouselCls = '__carousel';
export const slideCls = '__slide';
export const buttonCls = '__button';
export default {
  [mainCls]: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    background: (props) => props.sliderBackground || null,
    border: (props) => props.sliderBorder || null,
    borderRadius: (props) => props.sliderBorderRadius || null,
  },
  [`${mainCls}${carouselCls}`]: {
    display: 'flex',
    height: '100%',
    transition: 'transform .3s cubic-bezier(0.75, 0.25, 0.22, 0.90)',
    '&.deletePointerEvents': {
      '& > *': {
        pointerEvents: 'none',
      },
    },
  },
  [`${mainCls}${carouselCls}${slideCls}`]: {
    '&.image': {
      background: (props) => props.imageSlideBackground || null,
      '& a': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      '& img': {
        display: 'block',
        maxWidth: '100%',
        height: 'auto',
      },
      '& a.loading': {
        color: (props) => props.loadingImagePlaceHolderColor || null,
        '& .spinner > div': {
          borderColor: (props) => props.loadingImagePlaceHolderColor && `${props.loadingImagePlaceHolderColor} transparent transparent transparent`,
        },
      },
      '& .error a': {
        color: (props) => props.loadingImagePlaceHolderColor || null,
      },
    },
    '&.ytvideo': {
      background: (props) => props.videoSlideBackground || null,
      '& a': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: (props) => props.videoPreviewIconColor || null,
      },
      '& img': {
        display: 'block',
        maxWidth: '100%',
        height: 'auto',
      },
      '& a.loading': {
        color: (props) => props.videoPreviewLoadingColor || null,
      },
      '& .spinner > div': {
        borderColor: (props) => props.videoPreviewLoadingColor && `${props.videoPreviewLoadingColor} transparent transparent transparent`,
      },
    },
  },
  [`${mainCls}${carouselCls}${buttonCls}`]: {
    position: 'absolute',
    top: '50%',
    width: '40px',
    height: '40px',
    background: '#FFF',
    borderRadius: '20px',
    transform: 'translate(0, -50%)',
    '&.prev': {
      left: '0',
    },
    '&.next': {
      right: '0',
    },
    '&.disabled': {
      opacity: '.3',
    },
  },
};
