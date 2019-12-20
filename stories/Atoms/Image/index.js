import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import Link from '../Link';
import Panel from '../Panel';
import Icon from '../Icon';
import Spinner from '../Spinner';

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
  loadingIcon: PropTypes.string,
  isLoadedClb: PropTypes.func,
};

const defaultProps = {
  alt: null,
  width: null,
  height: null,
  cssClass: null,
  styleObj: {},
  link: null,
  linkTitle: null,
  loadingIcon: 'image',
  isLoadedClb: () => {},
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
  loadingIcon,
  isLoadedClb,
}) => {
  const classes = useStyles();

  const [isLoaded, setIsLoaded] = useState(false);
  const [isBroken, setIsBroken] = useState(false);

  const className = makeCls([classes[mainCls], cssClass]);
  const loadingStyle = !isLoaded ? { position: 'absolute', width: 0, height: 0 } : {};
  const style = makeStyle(loadingStyle, styleObj);

  const onLoadAction = (e) => { setIsLoaded(true); isLoadedClb(e); };
  const onErrorAction = () => setIsBroken(true);

  let code = null;

  if (isBroken) {
    const brokenClassName = makeCls([classes[mainCls], 'error', cssClass]);
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
        <Icon
          name="brokenImage"
          width={40}
          height={40}
          cssClass="noStroke"
        />
      </Link>
    ) : (
      <Icon
        name="brokenImage"
        width={40}
        height={40}
        cssClass="noStroke"
      />
    );
    code = (
      <Panel
        cssClass={brokenClassName}
        styleObj={brokenStyle}
      >
        {errorCode}
      </Panel>
    );
  } else {
    code = (
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
    let loadingContents = null;
    if (!isLoaded) {
      loadingContents = (
        <>
          <Icon
            name={loadingIcon}
            width={40}
            height={40}
            styleObj={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
          <Spinner
            width={80}
            height={80}
            strokeWidth={2}
          />
        </>
      );
    }
    if (link) {
      code = (
        <Link
          href={link}
          title={linkTitle || alt}
          cssClass={!isLoaded && 'loading'}
          styleObj={{
            position: 'relative',
            width: setSizeMeasureUnit(width) || '100%',
            height: setSizeMeasureUnit(height) || '100%',
          }}
        >
          {code}
          {loadingContents}
        </Link>
      );
    } else {
      code = (
        <>
          {code}
          {loadingContents}
        </>
      );
    }
  }
  return code;
};
Image.propTypes = propTypes;
Image.defaultProps = defaultProps;
export default Image;
