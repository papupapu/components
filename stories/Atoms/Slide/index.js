import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  cssClass: PropTypes.string,
  styleObj: PropTypes.instanceOf(Object),
  link: PropTypes.string,
  linkTitle: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]),
};

const defaultProps = {
  cssClass: '',
  styleObj: {},
  link: '',
  linkTitle: '',
  children: '',
};

const Slide = ({
  cssClass,
  styleObj,
  link,
  linkTitle,
  children,
}) => (
  <div
    className={cssClass}
    style={styleObj}
  >
    {
      link ? (
        <a href={link} title={linkTitle}>
          {children}
        </a>
      ) : children
    }
  </div>
);
Slide.propTypes = propTypes;
Slide.defaultProps = defaultProps;
export default Slide;
