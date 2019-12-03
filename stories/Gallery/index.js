import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import Button from '../Atoms/Button';

import makeCls from '../Utils/makeCls';
import makeStyle from '../Utils/makeStyle';
import setSizekMeasureUnit from '../Utils/setSizeMeasureUnit';

import * as helpers from './helpers';

import styles, {
  mainCls,
  sliderCls,
  panelCls,
  buttonCls,
} from './style';

const useStyles = createUseStyles(styles);

const propTypes = {
  ui: PropTypes.instanceOf(Object),
  items: PropTypes.instanceOf(Array),
  size: PropTypes.instanceOf(Object),
  hasButtons: PropTypes.bool,
  loop: PropTypes.bool,
};

const defaultProps = {
  ui: {},
  items: [],
  size: {},
  hasButtons: true,
  loop: false,
};

const Gallery = ({
  ui,
  items,
  size,
  hasButtons,
  loop,
}) => {
  const classes = useStyles();
  const galleryMainElement = useRef(null);

  const [moveState, setMoveState] = useState({
    current: loop ? 1 : 0,
    sliderCoords: loop && Object.keys(size).length ? size.w * -1 : 0,
    dir: '',
  });

  const [mouseDownState, setMouseDownState] = useState({
    down: false,
    coords: 0,
  });

  const [usableSize, setUsableSize] = useState(size);

  useEffect(
    () => {
      if (Object.keys(usableSize).length === 0) {
        setUsableSize({
          w: galleryMainElement.current.offsetWidth,
          h: galleryMainElement.current.offsetHeight,
        });
        setMoveState({
          ...moveState,
          ...{
            sliderCoords: loop ? galleryMainElement.current.offsetWidth * -1 : 0,
          },
        });
      }
    }, [usableSize, moveState, loop],
  );

  const {
    width,
    height,
    sliderWidth,
    panelWidth,
  } = helpers.getElementsSizes(usableSize, items.length, loop);

  const galleryClassName = makeCls([classes[mainCls]]);
  const galleryStyle = makeStyle({
    width: setSizekMeasureUnit(width),
    height: setSizekMeasureUnit(height),
  });

  const sliderClassName = makeCls([classes[`${mainCls}${sliderCls}`]]);
  const sliderStyle = makeStyle({
    width: setSizekMeasureUnit(sliderWidth),
    height: setSizekMeasureUnit(height),
    transform: `translate3d(${setSizekMeasureUnit(moveState.sliderCoords)}, 0, 0)`,
    transition: mouseDownState.down ? 'none' : null,
  });

  const panelClassName = makeCls([classes[`${mainCls}${sliderCls}${panelCls}`]]);
  const panelStyle = makeStyle({
    width: setSizekMeasureUnit(panelWidth),
    height: setSizekMeasureUnit(height),
    pointerEvents: moveState.dir !== '' ? 'none' : 'all',
  });

  const sliderContents = helpers.createSlides({
    domready: ui.device !== '',
    items,
    panelClassName,
    panelStyle,
    loop,
  });

  const prevSlide = () => setMoveState({
    ...moveState,
    ...{
      current: moveState.current - 1,
      sliderCoords: ((moveState.current - 1) * width) * -1,
      dir: '',
    },
  });

  const nextSlide = () => setMoveState({
    ...moveState,
    ...{
      current: moveState.current + 1,
      sliderCoords: ((moveState.current + 1) * width) * -1,
      dir: '',
    },
  });

  const stopMovingSlider = () => {
    if (moveState.dir === 'prev') {
      prevSlide();
    } else if (moveState.dir === 'next') {
      nextSlide();
    }
    setMouseDownState({
      down: false,
      coords: 0,
    });
  };

  const mouseDownOnSlider = (e) => setMouseDownState({
    down: true,
    coords: e.pageX,
  });

  const moveSlider = (e) => {
    if (mouseDownState.down) {
      const deltaX = e.pageX - mouseDownState.coords;
      const dir = deltaX > 0 ? 'prev' : 'next';
      const newCoords = deltaX + ((width * moveState.current) * -1);
      setMoveState({
        ...moveState,
        ...{
          sliderCoords: newCoords,
          dir,
        },
      });
    }
  };

  useEffect(
    () => {
      if (mouseDownState.down) {
        document.addEventListener('mouseup', stopMovingSlider);
      }
      return () => {
        document.removeEventListener('mouseup', stopMovingSlider);
      };
    },
  );

  return (
    <div
      ref={galleryMainElement}
      style={galleryStyle}
      className={galleryClassName}
    >
      <div
        role="presentation"
        style={sliderStyle}
        className={sliderClassName}
        onMouseMove={moveSlider}
        onMouseDown={mouseDownOnSlider}
      >
        {sliderContents}
      </div>
      {
        hasButtons && (
          <Button
            action={prevSlide}
            text="Prev"
            cssClass={makeCls([classes[`${mainCls}${sliderCls}${buttonCls}`], 'prev'])}
          />
        )
      }
      {
        hasButtons && (
          <Button
            action={nextSlide}
            text="Next"
            cssClass={makeCls([classes[`${mainCls}${sliderCls}${buttonCls}`], 'next'])}
          />
        )
      }
    </div>
  );
};
Gallery.propTypes = propTypes;
Gallery.defaultProps = defaultProps;
export default Gallery;
