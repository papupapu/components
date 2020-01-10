import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import icons from './icons';

import makeCls from '../../Utils/makeCls';
import makeStyle from '../../Utils/makeStyle';
import { addSizeMeasureUnit } from '../../Utils/sizeMeasureUnits';

import styles, {
  mainCls,
} from './style';

const useStyles = createUseStyles(styles);

const propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  color: PropTypes.string,
  cssClass: PropTypes.string,
  styleObj: PropTypes.instanceOf(Object),
};

const defaultProps = {
  width: null,
  height: null,
  color: null,
  cssClass: null,
  styleObj: {},
};

const Icon = ({
  name,
  width,
  height,
  color,
  cssClass,
  styleObj,
}) => {
  const classes = useStyles({ color });

  const IconComponent = icons[name] || null;
  const cls = makeCls([classes[mainCls], cssClass]);
  const style = makeStyle(
    styleObj,
    [
      {
        width: addSizeMeasureUnit(width),
        height: addSizeMeasureUnit(height),
      },
      true,
    ],
  );
  return (
    <IconComponent
      className={cls}
      style={style}
    />
  );
};
Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;
export default Icon;
