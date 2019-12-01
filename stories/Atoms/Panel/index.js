import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  cssClass: PropTypes.string,
  styleObj: PropTypes.instanceOf(Object),
  link: PropTypes.string,
  linkTitle: PropTypes.string,
};

const defaultProps = {
  cssClass: '',
  styleObj: {},
  link: '',
  linkTitle: '',
};

const Panel = ({
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
Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;
export default Panel;
