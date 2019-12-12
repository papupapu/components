import React, { useState } from 'react';
import PropTypes from 'prop-types';

import makeCls from '../../Utils/makeCls';
import makeStyle from '../../Utils/makeStyle';
import setSizeMeasureUnit from '../../Utils/setSizeMeasureUnit';

const propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  cssClass: PropTypes.string,
  styleObj: PropTypes.instanceOf(Object),
};

const defaultProps = {
  src: '',
  alt: '',
  width: null,
  height: null,
  cssClass: '',
  styleObj: {},
};

const Image = ({
  src,
  alt,
  width,
  height,
  cssClass,
  styleObj,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBroken, setIsBroken] = useState(false);
  const className = makeCls([cssClass]);
  const style = makeStyle({ opacity: !isLoaded || isBroken ? 0 : 1 }, styleObj);
  const code = (
    <img
      src={src}
      alt={alt || 'no info available'}
      width={setSizeMeasureUnit(width)}
      height={setSizeMeasureUnit(height)}
      className={className}
      style={style}
      onLoad={() => { setIsLoaded(true); }}
      onError={() => { setIsBroken(true); }}
    />
  );
  return code;
};
Image.propTypes = propTypes;
Image.defaultProps = defaultProps;
export default Image;
