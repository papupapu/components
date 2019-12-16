export const mainCls = 'gallery';
export const sliderCls = '__slider';
export const panelCls = '__panel';
export const buttonCls = '__button';
export default {
  [mainCls]: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: '#f1f1f1',
    overflow: 'hidden',
  },
  [`${mainCls}${sliderCls}`]: {
    display: 'flex',
    height: '100%',
    transition: 'transform .3s linear',
  },
  [`${mainCls}${sliderCls}${panelCls}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    '& img': {
      display: 'block',
      maxWidth: '100%',
      height: 'auto',
    },
  },
  [`${mainCls}${sliderCls}${buttonCls}`]: {
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
