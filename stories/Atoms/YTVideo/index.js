// https://developers.google.com/youtube/iframe_api_reference

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import Link from '../Link';
import Image from '../Image';

import makeCls from '../../Utils/makeCls';
import makeStyle from '../../Utils/makeStyle';
import loadScript from '../../Utils/loadScript';
import setSizeMeasureUnit from '../../Utils/setSizeMeasureUnit';

import * as constants from './constants';

import styles, {
  mainCls,
  linkCls,
} from './style';


const useStyles = createUseStyles(styles);

const propTypes = {
  ytvideoid: PropTypes.string.isRequired,
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
};

const defaultProps = {
  alt: null,
  width: null,
  height: null,
  cssClass: null,
  styleObj: {},
};

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
  const [player, setPlayer] = useState(null);
  const cls = makeCls([classes[mainCls], cssClass]);
  const previewLinkCls = makeCls([classes[`${mainCls}${linkCls}`]]);
  const style = makeStyle(styleObj);
  const playerHeight = 'height' in styleObj ? styleObj.height : height;

  useEffect(
    () => {
      if (isLoaded) {
        if (!window.YT) {
          loadScript(constants.YTApi);
          window.onYouTubeIframeAPIReady = () => {
            const playerConstructor = new window.YT.Player(
              `YTplayer_${ytvideoid}`,
              {
                width,
                height: playerHeight,
                videoId: ytvideoid,
                events: {
                  onReady: (e) => e.target.playVideo(),
                },
              },
            );
            setPlayer(playerConstructor);
          };
        } else {
          const playerConstructor = new window.YT.Player(
            `YTplayer_${ytvideoid}`,
            {
              width,
              height: playerHeight,
              videoId: ytvideoid,
              events: {
                onReady: (e) => e.target.playVideo(),
              },
            },
          );
          setPlayer(playerConstructor);
        }
      }
    }, [isLoaded, width, playerHeight, ytvideoid],
  );

  useEffect(
    () => {
      const removePlayer = () => {
        player.stopVideo();
        player.destroy();
        setIsLoaded(false);
        setPlayer(null);
        window.removeEventListener('click', removePlayer);
      };
      if (player) {
        window.addEventListener('click', removePlayer);
      }
    }, [player],
  );

  const linkPreviewAction = (e) => {
    e.preventDefault();
    setIsLoaded(true);
  };

  return !isLoaded ? (
    <Link
      href={`${constants.YTVideoPageUri}${ytvideoid}`}
      alt={alt}
      className={previewLinkCls}
      action={linkPreviewAction}
    >
      <Image
        src={`${constants.YTVideoImgUri}${ytvideoid}${constants.YTVideoImgName}`}
        alt={alt}
        width={setSizeMeasureUnit(width)}
        height={setSizeMeasureUnit(height)}
        className={cls}
        styleObj={style}
      />
    </Link>
  ) : (
    <div id={`YTplayer_${ytvideoid}`} />
  );
};
YTVideo.propTypes = propTypes;
YTVideo.defaultProps = defaultProps;
export default YTVideo;
