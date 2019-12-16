export const mainCls = 'icon';

export default {
  [mainCls]: {
    verticalAlign: 'middle',
    pointerEvents: 'all',
    fill: 'currentColor',
    '& path': {
      stroke: 'transparent',
    },
    '&.addStroke': {
      '& path': {
        stroke: 'currentColor',
      },
    },
  },
};
