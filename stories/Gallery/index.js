import React, { useState, useEffect } from 'react';
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
};

const defaultProps = {
  ui: {},
  items: [],
  size: {},
  hasButtons: true,
};

const Gallery = ({
  ui,
  items,
  size,
  hasButtons,
}) => {
  const classes = useStyles();

  const {
    width,
    height,
    sliderWidth,
    panelWidth,
  } = helpers.getElementsSizes(size, items.length);

  const [moveState, setMoveState] = useState({
    current: 0,
    sliderCoords: 0,
  });

  const [mouseDownState, setMouseDownState] = useState(false);

  useEffect(
    () => {
      const stop = () => {
        console.log('stop')
        setMouseDownState(false);
      }
      window.addEventListener('mouseup', stop);
      return () => {
        window.removeEventListener('mouseup', stop);
      };
    }, [],
  );

  const galleryClassName = makeCls([classes[mainCls]]);
  const galleryStyle = makeStyle({
    width: setSizekMeasureUnit(width),
    height: setSizekMeasureUnit(height),
  });

  const sliderClassName = makeCls([classes[`${mainCls}${sliderCls}`]]);
  const sliderStyle = makeStyle({
    width: setSizekMeasureUnit(sliderWidth),
    height: setSizekMeasureUnit(height),
    transform: `translate3d(-${setSizekMeasureUnit(moveState.sliderCoords)}, 0, 0)`,
  });

  const panelClassName = makeCls([classes[`${mainCls}${sliderCls}${panelCls}`]]);
  const panelStyle = makeStyle({
    width: setSizekMeasureUnit(panelWidth),
    height: setSizekMeasureUnit(height),
  });

  const sliderContents = helpers.createSlides({
    domready: ui.device !== '',
    items,
    panelClassName,
    panelStyle,
  });

  const mouseDownOnSlider = () => setMouseDownState(true);
  const moveSlider = () => {
    if (mouseDownState) {
      console.log('move');
    }
  };

  const prevSlide = () => setMoveState({
    current: moveState.current - 1,
    sliderCoords: width ? (moveState.current - 1) * width : `${(moveState.current - 1) * (100 / items.length)}%`,
  });

  const nextSlide = () => setMoveState({
    current: moveState.current + 1,
    sliderCoords: width ? (moveState.current + 1) * width : `${(moveState.current + 1) * (100 / items.length)}%`,
  });

  return (
    <div
      style={galleryStyle}
      className={galleryClassName}
    >
      <div
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
