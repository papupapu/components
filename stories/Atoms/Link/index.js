import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string,
  cssClass: PropTypes.string,
  styleObj: PropTypes.instanceOf(Object),
  rel: PropTypes.string,
  target: PropTypes.string,
  action: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
};

const defaultProps = {
  title: null,
  cssClass: null,
  styleObj: {},
  rel: null,
  target: null,
  action: null,
};

const Link = ({
  href,
  title,
  cssClass,
  styleObj,
  rel,
  target,
  action,
  children,
}) => {
  const onClickAction = (e) => {
    if (action === 'function') {
      e.preventDefault();
      action(e);
    }
  };
  return (
    <a
      href={href}
      title={title}
      className={cssClass}
      style={styleObj}
      rel={rel}
      target={target}
      onClick={onClickAction}
    >
      {children}
    </a>
  );
};

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;
export default Link;
