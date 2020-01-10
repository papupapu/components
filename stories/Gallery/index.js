import React, {
  useState,
  useRef,
  useEffect,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import GalleryTheme from '../Utils/theme';

import * as helpers from './helpers';

import makeCls from '../Utils/makeCls';

import styles, {
  mainCls,
  sliderCls,
  buttonCls,
  counterCls,
  controlsCls,
} from './style';

const useStyles = createUseStyles(styles);

const propTypes = {
  /**
    * Slider contents
    * collection of React Components
  */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  /**
   * user's device infos
   * {
   *  device: '',
   *  viewport: { width: null, height: null },
   *  touchscreen: null,
   *  orientation: null,
   *  mobileOs: null,
   * }
  */
  ui: PropTypes.instanceOf(Object),
  /*
   * width and height of Slider
   * optional
   * default value: {}
  */
  size: PropTypes.instanceOf(Object),
  /**
    * Slider theme to use
    * optional
    * default value: 'default'
  */
  theme: PropTypes.instanceOf(Object),
  /*
    * should Slider loop?
    * optional
    * default value: false
    *
    * probably should evolve for customization
    * text, cssClass, styleObj, hasButtons,
  */
  loop: PropTypes.bool,

  cssClass: PropTypes.string,
};

const defaultProps = {
  ui: {
    device: '',
    viewport: { width: null, height: null },
    touchscreen: null,
    orientation: null,
    mobileOs: null,
  },
  size: {},
  theme: { default: {} },
  loop: false,

  cssClass: null,
};

const Gallery = ({
  children,
  ui,
  size,
  loop,
  theme,
  cssClass,
}) => {
  const styleTheme = useContext(GalleryTheme(theme));
  const classes = useStyles(styleTheme);
  const gallery = useRef(null);
  const controls = useRef(null);
  const [current, setCurrent] = useState(1);
  const [move, setMove] = useState({ prev: false, next: false });
  const [sizeToUse, setSizeToUse] = useState(size);

  const prevSlide = () => {
    setMove({ prev: true, next: false });
  };
  const nextSlide = () => {
    setMove({ prev: false, next: true });
  };
  const sliderCurrent = (x) => {
    setCurrent(x);
    setMove({ prev: false, next: false });
  };

  useEffect(
    () => {
      if (
        !Object.keys(size).length
        && children.find((child) => child.props.role === 'controls')
      ) {
        const guttersSize = helpers.getGuttersSize(
          styleTheme.galleryPadding,
          styleTheme.galleryControlsMargin,
        );
        setSizeToUse({
          w: gallery.current.offsetWidth
          - guttersSize.parsedGalleryPadding.right
          - guttersSize.parsedGalleryPadding.left,
          h: gallery.current.offsetHeight
          - controls.current.offsetHeight
          - guttersSize.parsedGalleryPadding.top
          - guttersSize.parsedGalleryPadding.bottom
          - guttersSize.parsedGalleryControlsMargin.top
          - guttersSize.parsedGalleryControlsMargin.bottom,
        });
      }
    }, [size, children, ui, styleTheme],
  );

  const contents = helpers.createContents({
    components: children,
    cssClass,
    classes,
    sliderCls,
    buttonCls,
    counterCls,
    controlsCls,
    current,
    move,
    ui,
    size: sizeToUse,
    loop,
    theme,
    prevSlide,
    nextSlide,
    sliderCurrent,
    controls,
  });
  return (
    <div
      ref={gallery}
      className={makeCls([cssClass, classes[mainCls]])}
    >
      {contents}
    </div>
  );
};
Gallery.propTypes = propTypes;
Gallery.defaultProps = defaultProps;
export default Gallery;
