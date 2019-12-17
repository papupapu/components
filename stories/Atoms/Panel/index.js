import React, { memo } from 'react';
import PropTypes from 'prop-types';

import isEqual from '../../Utils/isEqual';

const panelPropsCheck = (
  prevPanelProps,
  nextPanelProps,
) => prevPanelProps.cssClass === nextPanelProps.cssClass
  && isEqual(prevPanelProps.styleObj, nextPanelProps.styleObj);

const propTypes = {
  cssClass: PropTypes.string,
  styleObj: PropTypes.instanceOf(Object),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
};

const defaultProps = {
  cssClass: null,
  styleObj: {},
};

const Panel = ({
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
Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;
export default memo(Panel, panelPropsCheck);
