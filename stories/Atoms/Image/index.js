import React, { useState } from 'react';

import makeStyle from '../../Utils/makeStyle';
import setSizekMeasureUnit from '../../Utils/setSizeMeasureUnit';

export default ({
  src,
  alt,
  width,
  height,
  cssClass,
  styleObj,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBroken, setIsBroken] = useState(false);
  const style = makeStyle({ opacity: !isLoaded || isBroken ? 0 : 1 }, styleObj);
  const code = (
    <img
      src={src}
      alt={alt || 'no info available'}
      width={setSizekMeasureUnit(width)}
      height={setSizekMeasureUnit(height)}
      className={cssClass || null}
      style={style}
      onLoad={() => { setIsLoaded(true); }}
      onError={() => { setIsBroken(true); }}
    />
  );
  return code;
};
