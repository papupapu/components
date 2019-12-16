export const mainCls = 'image';

export default {
  [mainCls]: {
    margin: '0',
    padding: '0',
    fontSize: '100%',
    verticalAlign: 'baseline',
    background: 'transparent',
    border: '0 none',
    outline: '0',
  },
  [`${mainCls}__error`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    fontSize: '20px',
    background: '#f7f7f0',
    '& a': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
};
