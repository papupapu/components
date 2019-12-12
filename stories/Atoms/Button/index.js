import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import makeCls from '../../Utils/makeCls';
import makeStyle from '../../Utils/makeStyle';

import styles, {
  mainCls,
} from './style';

const propTypes = {
  type: PropTypes.string,
  action: PropTypes.func,
  cssClass: PropTypes.string,
  styleObj: PropTypes.instanceOf(Object),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]),
};

const defaultProps = {
  type: 'button',
  action: () => {},
  cssClass: '',
  styleObj: {},
  children: '',
};

const useStyles = createUseStyles(styles);

const Button = ({
  type,
  action,
  cssClass,
  styleObj,
  children,
}) => {
  const classes = useStyles();
  const cls = makeCls([classes[mainCls], cssClass]);
  const style = makeStyle(styleObj || null);
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      type={type}
      className={cls}
      style={style}
      onClick={action}
    >
      {children}
    </button>
  );
};
Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export default Button;
