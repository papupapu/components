import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import makeCls from '../../Utils/makeCls';

import styles, {
  mainCls,
} from './style';

const useStyles = createUseStyles(styles);

const propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  color: PropTypes.string,
  cssClass: PropTypes.string,
};

const defaultProps = {
  width: 80,
  height: 80,
  strokeWidth: 8,
  color: '#000',
  cssClass: null,
};

const Spinner = ({
  width,
  height,
  strokeWidth,
  color,
  cssClass,
}) => {
  const classes = useStyles({
    width,
    height,
    strokeWidth,
    color,
  });
  const cls = makeCls([classes[mainCls], cssClass, 'spinner']);
  return (
    <div className={cls}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};
Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;
export default Spinner;
