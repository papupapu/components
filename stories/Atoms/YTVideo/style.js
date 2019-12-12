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
    '&:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
      background: 'url(http://localhost:8888/Img/play-button-1.png) center center no-repeat',
      backgroundSize: '100px 100px',
    },
  },
};
