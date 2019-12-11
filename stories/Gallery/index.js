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
  ui: PropTypes.instanceOf(Object).isRequired,
  /**
   * the gallery's contents
   * contents can be strings (supposedly a collection of img srcs)
   * or objects
  */
  items: PropTypes.instanceOf(Array).isRequired,
  /**
   * the gallery's panel to show
   * optional
   * default value: 0
  */
  startAt: PropTypes.number,
  /*
   * width and height of the gallery
   * optional
   * default value: {}
  */
  size: PropTypes.instanceOf(Object),
  /*
   * should the gallery show prev/next buttons?
   * optional
   * default value: true
  */
  hasButtons: PropTypes.bool,
  /*
   * should the gallery loop?
   * optional
   * default value: false
   *
   * probably should evolve for customization
   * text, cssClass, styleObj, hasButtons,
  */
  loop: PropTypes.bool,
  /*
   * is the gallery fullscreen?
   * optional
   * default value: false
  */
  fullscreen: PropTypes.bool,
};

const defaultProps = {
  size: {},
  startAt: 0,
  hasButtons: true,
  loop: false,
  fullscreen: false,
};

const Gallery = ({
  ui,
  items,
  size,
  startAt,
  hasButtons,
  loop,
  fullscreen,
}) => {
  const classes = useStyles();

  /**
   * ref attached to gallery container div for
   * size computation purpouses
   */
  const galleryMainElement = useRef(null);

  /**
   * STATE AND STATE MANAGEMENT
  */

  /**
   * set up UI state to:
   * - adjust to specific device needs
   * - react to viewport changes
   */
  const [uiState, setUiState] = useState(ui);

  /**
   * set up currentSize state (i.e. width / height of gallery)
   * in case the size prop is not defined, currentSize will be calculated
   * once the UI prop changes (so, even after first mount)
   */
  const [currentSize, setCurrentSize] = useState(size);

  /**
   * set up the actual sizes that will be applied to all gallery's elements
   * sizes will be computed using: currentSize state, number of items and loop prop
   */
  const [computedSizes, setComputeSizes] = useState(
    helpers.getElementsSizes(currentSize, items.length, loop),
  );

  /**
   * set up move state to keep track of:
   * - the current slide
   * - the coordinates of the gallery's slider
   * - the direction of the slider while it is moving
   */
  const [moveState, setMoveState] = useState({
    current: helpers.initialSlide(startAt, loop),
    sliderCoords: helpers.initialSliderCoords(loop, size, items),
    dir: '',
  });

  /**
   * set up mouseDown state to keep track of:
   * - the event fired by the user when he clicks and drag the slider
   * - the coordinates at which the mousedown event happened
   */
  const [mouseDownState, setMouseDownState] = useState({
    down: false,
    coords: 0,
  });

  /**
   * effect triggered by viewport size changes.
   * it is going be triggered just after first mount since initially
   * the viewport object contents are set to null
   *
   * it is used to set up the computedSize state in case the size prop is not defined
   * and to add responsive behaviour in case of viewport changes
   */
  useEffect(
    () => {
      /**
       * in case the viewport has changed
       */
      if (
        uiState.viewport.width !== ui.viewport.width
        || uiState.viewport.height !== ui.viewport.height
      ) {
        /**
         * set the new uiState
         */
        setUiState(ui);

        /**
         * compute the new currentSize state
         */
        let newSize;

        /**
         * in case the gallery is fullscreen
         * the new currentSize state is the new viewport size
         */
        if (fullscreen) {
          newSize = {
            w: ui.viewport.width,
            h: ui.viewport.height,
          };

          /**
           * in case the gallery is responsive (size prop is not defined)
           * the new currentSize state is the gallery's parent node size
           */
        } else if (Object.keys(size).length === 0) {
          newSize = {
            w: galleryMainElement.current.parentNode.offsetWidth,
            h: galleryMainElement.current.parentNode.offsetHeight,
          };

        /**
         * in case the size prop is defined, let's stick with that
         */
        } else {
          newSize = {
            w: size.w,
            h: size.h,
          };
        }

        /**
         * set the new currentSize state
        */
        setCurrentSize(newSize);

        /**
         * set the new computedSize state
         */
        setComputeSizes(
          helpers.getElementsSizes(newSize, items.length, loop),
        );

        /**
         * adjust the coordinates of the gallery's slider
        */
        if (moveState.current !== 1) {
          setMoveState({
            ...moveState,
            ...{
              sliderCoords: helpers.sliderCoords(moveState.current, newSize.w),

              /**
               * set dir to 'loop' to reset the css transition while
               * moving the slider to the correct coordinates
              */
              dir: 'loop',
            },
          });
        }
      }
    }, [fullscreen, size, items.length, loop, ui, uiState, moveState],
  );

  /**
   * CREATE CSS CLASSES & INLINE STYLES (based on state)
  */

  /**
   * create the gallery's css classname and
   * create its inline style object
  */
  const galleryClassName = makeCls([classes[mainCls]]);
  const galleryStyle = makeStyle({
    width: setSizekMeasureUnit(computedSizes.width),
    height: setSizekMeasureUnit(computedSizes.height),
  });
  /**
   * create the gallery slider's css classname and
   * create its inline style object
  */
  const sliderClassName = makeCls([classes[`${mainCls}${sliderCls}`]]);
  const sliderStyle = makeStyle({
    width: setSizekMeasureUnit(computedSizes.sliderWidth),
    height: setSizekMeasureUnit(computedSizes.height),
    transform: `translate3d(${setSizekMeasureUnit(moveState.sliderCoords)}, 0, 0)`,

    /**
     * if either the user is dragging the slider or the slider has to adjust it's coordinates
     * because of looping or reacting to viewport changes, the css transition is set to none
     * else it works with the one defined by css
    */
    transition: mouseDownState.down || moveState.dir === 'loop' ? 'none' : null,
  });

  /**
   * create the gallery panels' css classname and
   * create their inline style object
  */
  const panelClassName = makeCls([classes[`${mainCls}${sliderCls}${panelCls}`]]);
  const panelStyle = makeStyle({
    width: setSizekMeasureUnit(computedSizes.panelWidth),
    height: setSizekMeasureUnit(computedSizes.height),
    pointerEvents: moveState.dir !== '' ? 'none' : 'all',
  });

  /**
   * create the gallery panels
  */
  const sliderContents = helpers.createSlides({
    domready: ui.device !== '',
    items,
    panelClassName,
    panelStyle,
    loop,
  });

  /**
   * ANIMATE GALLERY
  */

  /**
   * move the slider to a new panel
  */
  const jumpToSlide = (current) => {
    setMoveState({
      ...moveState,
      ...{
        current,
        sliderCoords: helpers.sliderCoords(current, computedSizes.width),
        dir: 'loop',
      },
    });
  };
  /**
   * move the slider to the previous panel
  */
  const prevSlide = () => {
    let current = moveState.current - 1;

    /**
     * if the gallery is not supposed to loop,
     * stop at the first panel
     */
    if (!loop && current >= 0) {
      setMoveState({
        ...moveState,
        ...{
          current,
          sliderCoords: helpers.sliderCoords(current, computedSizes.width),
          dir: '',
        },
      });
    } else if (loop) {
      setMoveState({
        ...moveState,
        ...{
          current,
          sliderCoords: helpers.sliderCoords(current, computedSizes.width),
          dir: '',
        },
      });

      /**
       * if the gallery is supposed to loop, the first panel is clone of the last
       * so as soon as the animation ends, jump to the last panel to create the loop effect
      */
      if (current === 0) {
        current = sliderContents.length - 2;
        setTimeout(
          () => jumpToSlide(current),
          305,
        );
      }
    }
  };

  /**
   * move the slider to the next panel
  */
  const nextSlide = () => {
    let current = moveState.current + 1;

    /**
     * if the gallery is not supposed to loop,
     * stop at the last panel
     */
    if (!loop && current <= sliderContents.length - 1) {
      setMoveState({
        ...moveState,
        ...{
          current,
          sliderCoords: helpers.sliderCoords(current, computedSizes.width),
          dir: '',
        },
      });
    } else if (loop) {
      setMoveState({
        ...moveState,
        ...{
          current,
          sliderCoords: helpers.sliderCoords(current, computedSizes.width),
          dir: '',
        },
      });

      /**
       * if the gallery is supposed to loop, the last panel is clone of the first
       * so as soon as the animation ends, jump to the first panel to create the loop effect
      */
      if (current === sliderContents.length - 1) {
        current = 1;
        setTimeout(
          () => jumpToSlide(current),
          305,
        );
      }
    }
  };

  /**
   * if the user fires a mouseDown event on the slider, prepare to animate it by dragging action by
   * - setting the mouseDown state to true
   * - registering the coordinates at which the mouseDown event happened
  */
  const mouseDownOnSlider = (e) => setMouseDownState({
    down: true,
    coords: e.pageX,
  });

  /**
   * gallery animation by dragging
  */
  const moveSlider = (e) => {
    if (mouseDownState.down) {
      /**
       * the difference between the current mouse position and the one registered when
       * the mouseDown event was fired is going to give us:
       * - the amount of movement
       * - the direction of the movement
       * - the new position of the slider
      */
      const deltaX = e.pageX - mouseDownState.coords;
      const dir = deltaX > 0 ? 'prev' : 'next';
      const newCoords = deltaX + helpers.sliderCoords(moveState.current, computedSizes.width);

      /**
       * if the gallery is not supposed to loop, do not apply any animation if the user is
       * try to go past the first or the last slide
      */
      if (
        (
          !loop
          && dir === 'prev'
          && moveState.current === 0
        ) || (
          !loop
          && dir === 'next'
          && moveState.current === sliderContents.length - 1
        )
      ) {
        setMoveState({
          ...moveState,
          ...{ dir: '' }, // resetting moveState dir possibly unnecessary???
        });
      } else {
        setMoveState({
          ...moveState,
          ...{
            sliderCoords: newCoords,
            dir,
          },
        });
      }
    }
  };

  /**
   * if the user fires a mouseUp event after he has been dragging the slider
   * the event registered in the effect running just below
  */
  const stopMovingSlider = () => {
    /**
     * if the direction of the slider has been registered,
     * go to the previous or next panel accordingly
    */
    if (moveState.dir === 'prev') {
      prevSlide();
    } else if (moveState.dir === 'next') {
      nextSlide();
    }

    /**
     * reset the mouseDown state
    */
    setMouseDownState({
      down: false,
      coords: 0,
    });
  };

  /**
   * effect run at every render since it has to listen to user actions
   *
   * it is used to attach (and remove) a mouseUp event listener
   * on the window to register mouseUp events
   */
  useEffect(
    () => {
      /**
       * if the mouseDown state value for down is true
       * attach a mouseUp event listener to trigger
       * 'complete dragging' animation
      */
      if (mouseDownState.down) {
        document.addEventListener('mouseup', stopMovingSlider);
      } else {
        document.removeEventListener('mouseup', stopMovingSlider);
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
            cssClass={makeCls([
              classes[`${mainCls}${sliderCls}${buttonCls}`],
              'prev',
              !loop && moveState.current === 0 && 'disabled',
            ])}
          >
            Prev
          </Button>
        )
      }
      {
        hasButtons && (
          <Button
            action={nextSlide}
            cssClass={makeCls([
              classes[`${mainCls}${sliderCls}${buttonCls}`],
              'next',
              !loop && moveState.current === sliderContents.length - 1 && 'disabled',
            ])}
          >
            Next
          </Button>
        )
      }
    </div>
  );
};
Gallery.propTypes = propTypes;
Gallery.defaultProps = defaultProps;
export default Gallery;
