import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import makeCls from '../../Utils/makeCls';

import styles, {
  mainCls,
} from './style';

const useStyles = createUseStyles(styles);

const propTypes = {
  type: PropTypes.string,
  cssClass: PropTypes.string,
  styleObj: PropTypes.instanceOf(Object),
  action: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
};

const defaultProps = {
  type: 'button',
  cssClass: null,
  styleObj: {},
  action: null,
};

const Button = ({
  type,
  action,
  cssClass,
  styleObj,
  children,
}) => {
  const classes = useStyles();
  const cls = makeCls([classes[mainCls], cssClass]);
  const onClickAction = (e) => {
    if (typeof action === 'function') {
      e.preventDefault();
      action(e);
    }
  };
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      type={type}
      className={cls}
      style={styleObj}
      onClick={onClickAction}
    >
      {children}
    </button>
  );
};
Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export default Button;
