import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  cssClass: PropTypes.string,
  styleObj: PropTypes.instanceOf(Object),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]),
};

const defaultProps = {
  cssClass: '',
  styleObj: {},
  children: '',
};

const Slide = ({
  cssClass,
  styleObj,
  children,
}) => (
  <div
    className={cssClass}
    style={styleObj}
  >
    {children}
  </div>
);
Slide.propTypes = propTypes;
Slide.defaultProps = defaultProps;
export default Slide;
