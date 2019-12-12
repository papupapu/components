import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import Image from '../Image';

import makeCls from '../../Utils/makeCls';
import makeStyle from '../../Utils/makeStyle';
import setSizeMeasureUnit from '../../Utils/setSizeMeasureUnit';

import styles, {
  mainCls,
  linkCls,
} from './style';

const propTypes = {
  ytvideoid: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  cssClass: PropTypes.string,
  styleObj: PropTypes.instanceOf(Object),
};

const defaultProps = {
  ytvideoid: '',
  alt: '',
  width: null,
  height: null,
  cssClass: '',
  styleObj: {},
};

const useStyles = createUseStyles(styles);

const YTVideo = ({
  ytvideoid,
  alt,
  width,
  height,
  cssClass,
  styleObj,
}) => {
  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false);
  const cls = makeCls([classes[mainCls], cssClass]);
  const previewLinkCls = makeCls([classes[`${mainCls}${linkCls}`]]);
  const style = makeStyle(styleObj);

  return !isLoaded ? (
    <a
      href={`https://www.youtube.com/watch?v=${ytvideoid}`}
      alt={alt}
      className={previewLinkCls}
      onClick={
        (e) => {
          e.preventDefault();
          setIsLoaded(true);
        }
      }
    >
      <Image
        src={`https://i.ytimg.com/vi/${ytvideoid}/hq720.jpg`}
        alt={alt || 'no info available'}
        width={setSizeMeasureUnit(width)}
        height={setSizeMeasureUnit(height)}
        className={cls}
        styleObj={style}
      />
    </a>
  ) : (
    <iframe
      title={alt}
      src={`https://www.youtube.com/embed/${ytvideoid}?autoplay=1`}
      className={cls}
      width={setSizeMeasureUnit(width)}
      height={setSizeMeasureUnit(height)}
      style={style}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};
YTVideo.propTypes = propTypes;
YTVideo.defaultProps = defaultProps;
export default YTVideo;
