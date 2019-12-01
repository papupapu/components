import React from 'react';
import PropTypes from 'prop-types';

import { createUseStyles } from 'react-jss';
import styles, { mainCls } from './style';

import makeCls from '../../Utils/makeCls';
import makeStyle from '../../Utils/makeStyle';

const useStyles = createUseStyles(styles);

const propTypes = {
  type: PropTypes.string,
  action: PropTypes.func,
  text: PropTypes.string,
  cssClass: PropTypes.string,
  styleObj: PropTypes.instanceOf(Object),
};

const defaultProps = {
  type: 'button',
  action: () => {},
  text: '',
  cssClass: '',
  styleObj: {},
};

const Button = ({
  type,
  action,
  text,
  cssClass,
  styleObj,
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
      {text}
    </button>
  );
};
Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export default Button;
