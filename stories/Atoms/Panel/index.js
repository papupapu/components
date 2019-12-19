import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import isEqual from '../../Utils/isEqual';
import makeCls from '../../Utils/makeCls';

import styles, {
  mainCls,
} from './style';

const useStyles = createUseStyles(styles);

const panelPropsCheck = (
  prevPanelProps,
  nextPanelProps,
) => prevPanelProps.cssClass === nextPanelProps.cssClass
  && isEqual(prevPanelProps.styleObj, nextPanelProps.styleObj)
  && prevPanelProps.loaded === nextPanelProps.loaded;

const propTypes = {
  cssClass: PropTypes.string,
  styleObj: PropTypes.instanceOf(Object),
  loaded: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
};

const defaultProps = {
  cssClass: null,
  styleObj: {},
  loaded: true,
};

const Panel = ({
  cssClass,
  styleObj,
  loaded,
  children,
}) => {
  const classes = useStyles();

  const className = makeCls([classes[mainCls], cssClass]);
  return (
    <div
      className={className}
      style={styleObj}
    >
      {loaded && children}
    </div>
  );
};
Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;
export default memo(Panel, panelPropsCheck);
