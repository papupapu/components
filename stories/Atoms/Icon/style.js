export const mainCls = 'icon';

export default {
  [mainCls]: {
    verticalAlign: 'middle',
    pointerEvents: 'all',
    fill: (props) => `${props.color || 'currentColor'}`,
    '& path': {
      stroke: 'transparent',
    },
    '&.addStroke': {
      '& path': {
        stroke: (props) => `${props.color || 'currentColor'}`,
      },
    },
  },
};
