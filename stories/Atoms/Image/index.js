import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import Link from '../Link';
import Panel from '../Panel';

import makeCls from '../../Utils/makeCls';
import makeStyle from '../../Utils/makeStyle';
import setSizeMeasureUnit from '../../Utils/setSizeMeasureUnit';

import styles, {
  mainCls,
} from './style';

const useStyles = createUseStyles(styles);

const propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  cssClass: PropTypes.string,
  styleObj: PropTypes.instanceOf(Object),
  link: PropTypes.string,
  linkTitle: PropTypes.string,
};

const defaultProps = {
  alt: null,
  width: null,
  height: null,
  cssClass: null,
  styleObj: {},
  link: null,
  linkTitle: null,
};

const Image = ({
  src,
  alt,
  width,
  height,
  cssClass,
  styleObj,
  link,
  linkTitle,
}) => {
  const classes = useStyles();

  const [isLoaded, setIsLoaded] = useState(false);
  const [isBroken, setIsBroken] = useState(false);

  const className = makeCls([classes[mainCls], cssClass]);
  const style = makeStyle({ opacity: !isLoaded ? 0 : 1 }, styleObj);

  const onLoadAction = () => setIsLoaded(true);
  const onErrorAction = () => setIsBroken(true);

  let code = (
    <img
      src={src}
      alt={alt}
      width={setSizeMeasureUnit(width)}
      height={setSizeMeasureUnit(height)}
      className={className}
      style={style}
      onLoad={onLoadAction}
      onError={onErrorAction}
    />
  );
  if (link) {
    code = (
      <Link
        href={link}
        title={linkTitle || alt}
      >
        {code}
      </Link>
    );
  }
  if (isBroken) {
    const brokenClassName = makeCls([classes[`${mainCls}__error`], cssClass]);
    const brokenStyle = makeStyle({
      width: setSizeMeasureUnit(width) || '100%',
      height: setSizeMeasureUnit(height) || '100%',
    });
    const errorCode = link ? (
      <Link
        href={link}
        title={linkTitle || alt}
        styleObj={brokenStyle}
      >
      Oooooooops...
      </Link>
    ) : 'Oooooooops...';
    code = (
      <Panel
        cssClass={brokenClassName}
        styleObj={brokenStyle}
      >
        {errorCode}
      </Panel>
    );
  }
  return code;
};
Image.propTypes = propTypes;
Image.defaultProps = defaultProps;
export default Image;
