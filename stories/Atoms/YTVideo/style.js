export const mainCls = 'iframe';
export const linkCls = '__previewLink';

export default {
  [mainCls]: {
    margin: '0',
    padding: '0',
    background: 'transparent',
    border: '0 none',
  },
  [`${mainCls}${linkCls}`]: {
    display: 'block',
    position: 'relative',
    '& .icon': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      opacity: '.7',
      pointerEvents: 'none',
    },
  },
};
