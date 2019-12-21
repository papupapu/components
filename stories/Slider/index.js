import React, {
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import SliderTheme from '../Utils/theme';

import makeCls from '../Utils/makeCls';
import makeStyle from '../Utils/makeStyle';
import setSizeMeasureUnit from '../Utils/setSizeMeasureUnit';
import { isValidString } from '../Utils/validvars';
import {
  disableScroll,
  enableScroll,
} from '../Utils/scrollActions';

import * as helpers from './helpers';

import styles, {
  mainCls,
  carouselCls,
  slideCls,
} from './style';

const useStyles = createUseStyles(styles);

const propTypes = {
  /**
   * Slider contents
   * collection of React Components
  */
  children: PropTypes.instanceOf(Array).isRequired,
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
  /**
   * Slider slide to show
   * optional
   * default value: 0
  */
  startAt: PropTypes.number,
  move: PropTypes.instanceOf(Object),
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
  /*
   * is Slider fullscreen?
   * optional
   * default value: false
  */
  fullscreen: PropTypes.bool,
  passCurrent: PropTypes.func,
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
  startAt: 0,
  move: { prev: false, next: false },
  loop: false,
  fullscreen: false,
  passCurrent: null,
};

const Slider = ({
  children,
  ui,
  size,
  theme,
  startAt,
  move,
  loop,
  fullscreen,
  passCurrent,
}) => {
  const styleTheme = useContext(SliderTheme(theme));
  const classes = useStyles(styleTheme);
  /**
   * ref attached to Slider container div for
   * size computation purpouses
   */
  const sliderMainElement = useRef(null);
  /**
   * set up UI state to:
   * - adjust to specific device needs
   * - react to viewport changes
   */
  const [uiState, setUiState] = useState(ui);
  /**
   * set up currentSize state (i.e. width / height of Slider)
   * in case the size prop is not defined, currentSize will be calculated
   * once the UI prop changes (so, even after first mount)
   */
  const [currentSize, setCurrentSize] = useState(size);
  /**
   * set up the actual sizes that will be applied to all Slider elements
   * sizes will be computed using: currentSize state, number of children and loop prop
   */
  const [computedSizes, setComputeSizes] = useState(
    helpers.getElementsSizes(currentSize, children.length, loop),
  );
  /**
   * set up move state to keep track of:
   * - the current slide
   * - the coordinates of Slider
   * - the direction of Slider while it is moving
   */
  const [moveState, setMoveState] = useState({
    current: helpers.initialSlide(startAt, loop),
    loadedSlides: [helpers.initialSlide(startAt, loop)],
    carouselCoords: helpers.initialSliderCoords(loop, size, children),
    dir: '',
  });
  /**
   * set up mouseDown state to keep track of:
   * - the event fired by the user when he clicks and drag Slider
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
         * in case Slider is fullscreen
         * the new currentSize state is the new viewport size
         */
        if (fullscreen) {
          newSize = {
            w: ui.viewport.width,
            h: ui.viewport.height,
          };

          /**
           * in case Slider is responsive (size prop is not defined)
           * the new currentSize state is Slider parent node size
           */
        } else if (Object.keys(size).length === 0) {
          newSize = {
            w: sliderMainElement.current.parentNode.offsetWidth,
            h: sliderMainElement.current.parentNode.offsetHeight,
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
          helpers.getElementsSizes(newSize, children.length, loop),
        );
        /**
         * adjust the coordinates of Slider
        */
        if (moveState.current !== 1) {
          setMoveState({
            ...moveState,
            ...{
              carouselCoords: helpers.carouselCoords(moveState.current, newSize.w),
              /**
               * set dir to 'loop' to reset the css transition while
               * moving Slider to the correct coordinates
              */
              dir: 'loop',
            },
          });
        }
      }
    }, [fullscreen, size, children.length, loop, ui, uiState, moveState],
  );
  /**
   * create Slider css classname and
   * create its inline style object
  */
  const sliderClassName = makeCls([
    classes[mainCls],
  ]);
  const sliderStyle = makeStyle({
    width: setSizeMeasureUnit(computedSizes.width),
    height: setSizeMeasureUnit(computedSizes.height),
  });
  /**
   * create Slider css classname and
   * create its inline style object
  */
  const carouselClassName = makeCls([
    classes[`${mainCls}${carouselCls}`],
    isValidString(moveState.dir) && moveState.dir !== 'loop' && 'deletePointerEvents',
  ]);
  const carouselStyle = makeStyle({
    width: setSizeMeasureUnit(computedSizes.carouselWidth),
    height: setSizeMeasureUnit(computedSizes.height),
    transform: `translate3d(${setSizeMeasureUnit(moveState.carouselCoords)}, 0, 0)`,
    /**
     * if either the user is dragging Slider or Slider has to adjust it's coordinates
     * because of looping or reacting to viewport changes, the css transition is set to none
     * else it works with the one defined by css
    */
    transition: mouseDownState.down || moveState.dir === 'loop' ? 'none' : null,
  });
  /**
   * create Slider slides' css classname and
   * create their inline style object
  */
  const slideClassName = makeCls([
    classes[`${mainCls}${carouselCls}${slideCls}`],
  ]);
  const slideSize = makeStyle({
    width: computedSizes.slideWidth,
    height: computedSizes.height,
  });
  /**
     * create Slider slides
   */
  const carouselContents = helpers.createSlides({
    domready: ui.device !== '',
    items: children,
    slideClassName,
    slideSize,
    loop,
    loadedSlides: moveState.loadedSlides,
  });
  /**
   * move Slider to a new slide
  */
  const jumpToSlide = (current, slidesToLoad) => {
    setMoveState({
      ...moveState,
      ...{
        current,
        loadedSlides: slidesToLoad,
        carouselCoords: helpers.carouselCoords(current, computedSizes.width),
        dir: 'loop',
      },
    });
  };
  /**
   * move Slider to the previous slide
  */
  const prevSlide = () => {
    let current = moveState.current - 1;
    const totSlides = loop ? children.length + 2 : children.length;
    const slidesToLoad = helpers.computeSlidesToLoad(
      moveState.loadedSlides,
      current,
      totSlides,
      'prev',
    );
    /**
     * if Slider is not supposed to loop,
     * stop at the first slide
     */
    if (!loop && current >= 0) {
      setMoveState({
        ...moveState,
        ...{
          current,
          loadedSlides: slidesToLoad,
          carouselCoords: helpers.carouselCoords(current, computedSizes.width),
          dir: '',
        },
      });
      passCurrent(current);
    } else if (loop) {
      setMoveState({
        ...moveState,
        ...{
          current,
          loadedSlides: slidesToLoad,
          carouselCoords: helpers.carouselCoords(current, computedSizes.width),
          dir: '',
        },
      });
      /**
       * if Slider is supposed to loop, the first slide is clone of the last
       * so as soon as the animation ends, jump to the last slide to create the loop effect
      */
      if (current === 0) {
        current = carouselContents.length - 2;
        passCurrent(current);
        setTimeout(
          () => jumpToSlide(current, slidesToLoad),
          305,
        );
      } else {
        passCurrent(current);
      }
    }
  };

  /**
   * move Slider to the next slide
  */
  const nextSlide = () => {
    let current = moveState.current + 1;
    const totSlides = loop ? children.length + 2 : children.length;
    const slidesToLoad = helpers.computeSlidesToLoad(
      moveState.loadedSlides,
      current,
      totSlides,
      'next',
    );
    /**
     * if Slider is not supposed to loop,
     * stop at the last slide
     */
    if (!loop && current <= carouselContents.length - 1) {
      setMoveState({
        ...moveState,
        ...{
          current,
          loadedSlides: slidesToLoad,
          carouselCoords: helpers.carouselCoords(current, computedSizes.width),
          dir: '',
        },
      });
      passCurrent(current);
    } else if (loop) {
      setMoveState({
        ...moveState,
        ...{
          current,
          loadedSlides: slidesToLoad,
          carouselCoords: helpers.carouselCoords(current, computedSizes.width),
          dir: '',
        },
      });
      /**
       * if Slider is supposed to loop, the last slide is clone of the first
       * so as soon as the animation ends, jump to the first slide to create the loop effect
      */
      if (current === carouselContents.length - 1) {
        current = 1;
        passCurrent(current);
        setTimeout(
          () => jumpToSlide(current, slidesToLoad),
          305,
        );
      } else {
        passCurrent(current);
      }
    }
  };

  const correctEvent = (e) => {
    if (uiState.touchscreen) {
      return e.touches[0];
    }
    return e;
  };
  /**
   * if the user fires a mouseDown event on Slider, prepare to animate it by dragging action by
   * - setting the mouseDown state to true
   * - registering the coordinates at which the mouseDown event happened
  */
  const mouseDownOnSlider = (e) => setMouseDownState({
    down: true,
    coords: correctEvent(e).pageX,
  });
  /**
   * Slider animation by dragging
  */
  const moveSlider = (e) => {
    if (mouseDownState.down) {
      disableScroll();
      /**
       * the difference between the current mouse position and the one registered when
       * the mouseDown event was fired is going to give us:
       * - the amount of movement
       * - the direction of the movement
       * - the new position of Slider
      */
      const deltaX = correctEvent(e).pageX - mouseDownState.coords;
      const dir = deltaX > 0 ? 'prev' : 'next';
      const newCoords = deltaX + helpers.carouselCoords(moveState.current, computedSizes.width);
      /**
       * if Slider is not supposed to loop, do not apply any animation if the user is
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
          && moveState.current === carouselContents.length - 1
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
            carouselCoords: newCoords,
            dir,
          },
        });
      }
    }
  };
  /**
   * if the user fires a mouseUp event after he has been dragging Slider
   * the event registered in the effect running just below
  */
  const stopMovingSlider = () => {
    /**
     * if the direction of Slider has been registered,
     * go to the previous or next slide accordingly
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
    enableScroll();
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

  useEffect(
    () => {
      if (move.next) {
        nextSlide();
      } else if (move.prev) {
        prevSlide();
      }
    },
  );

  return (
    <div
      ref={sliderMainElement}
      style={sliderStyle}
      className={sliderClassName}
    >
      <div
        role="presentation"
        style={carouselStyle}
        className={carouselClassName}
        onMouseMove={moveSlider}
        onMouseDown={mouseDownOnSlider}
        onTouchStart={mouseDownOnSlider}
        onTouchMove={moveSlider}
        onTouchEnd={stopMovingSlider}
      >
        {carouselContents}
      </div>
    </div>
  );
};
Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;
export default Slider;
