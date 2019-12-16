export const mainCls = 'spinner';

export default {
  '@keyframes lds-ring': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
  [mainCls]: {
    display: 'inline-block',
    position: 'relative',
    width: (props) => `${props.width}px`,
    height: (props) => `${props.height}px`,
    '& div': {
      position: 'absolute',
      display: 'block',
      boxSizing: 'border-box',
      width: (props) => `${props.width - (props.strokeWidth * 2)}px`,
      height: (props) => `${props.height - (props.strokeWidth * 2)}px`,
      margin: (props) => `${props.strokeWidth}px`,
      border: (props) => `${props.strokeWidth}px solid ${props.color}`,
      borderColor: (props) => `${props.color} transparent transparent transparent`,
      borderRadius: '50%',
      animationName: '$lds-ring',
      animationDuration: '1.2s',
      animationTimingFunction: 'cubic-bezier(0.5, 0, 0.5, 1)',
      animationIterationCount: 'infinite',
      '&:nth-child(1)': {
        animationDelay: '-0.45s',
      },
      '&:nth-child(2)': {
        animationDelay: '-0.3s',
      },
      '&:nth-child(3)': {
        animationDelay: '-0.15s',
      },
    },
  },
};
