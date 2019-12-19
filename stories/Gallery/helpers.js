import React, { cloneElement, isValidElement } from 'react';

import Slide from '../Atoms/Panel';

import setSizeMeasureUnit from '../Utils/setSizeMeasureUnit';

/**
  * @desc compute Slide to be shown on mount
  *
  * @param {number} startAt Slide to be shown on mount index
  * @param {boolean} loop should Gallery loop?
  *
  * @returns {number} Slide to be shown on mount index
*/
export const initialSlide = (startAt, loop) => {
  if (startAt !== 0) {
    return startAt;
  }
  /**
   * if Gallery is supposed to loop the first Slide is 1
   * since 0 is the clone of the last Slide (see 'createSlides' method)
  */
  return loop ? 1 : 0;
};

/**
  * @desc compute Slider initial position
  *
  * @param {boolean} loop should Gallery loop?
  * @param {object} size Gallery width and height
  * @param {array} items Slides data collection
  *
  * @returns {number} Slider initial position
  *
  * TODO:
  * - factor in optional startAt prop value
  * - add different logic for different Slider type
  *   (i.e. centered Slide with two showing at its sides)
*/
export const initialSliderCoords = (loop, size, items) => {
  /**
   * if Gallery is supposed to loop the first Slide is 1
   * since 0 is the clone of the last Slide (see 'createSlides' method)
   *
   * thus Slider initial position will be: Gallery width * -1
  */
  if (loop) {
    if (Object.keys(size).length) {
      return size.w * -1;
    }
    /**
     * if we do not have the explicit Gallery width value yet,
     * Slider initial position will be expressed in percentage
     *
     * add 2 to items.length since items[0] and items[items.length -1]
     * are cloned and added to items to create the loop effect
    */
    return `-${100 / (items.length + 2)}%`;
  }
  return 0;
};

/**
  * @desc compute Slider current position
  *
  * @param {number} current index of the currently shown Slide
  * @param {number} size Gallery width and height
  *
  * @returns {number} Slider current position
  *
  * TODO:
  * - add different logic for different Slider type
  *   (i.e. centered Slide with two showing at its sides)
*/
export const sliderCoords = (current, width) => (current * width) * -1;

/**
  * @desc compute the size of Slider elements
  *
  * @param {number} size Gallery width and height
  * @param {number} itemsLength number of Slides
  * @param {boolean} loop should Gallery loop?
  *
  * @returns {object} Gallery width / height, Slider total width, Slide width
*/
export const getElementsSizes = (size, itemsLength, loop) => {
  /**
   * if Gallery is supposed to loop items[0] and items[items.length -1]
   * are cloned and added to items to create the loop effect
  */
  const additionalSlidesForLoop = loop ? itemsLength + 2 : itemsLength;
  /**
   * if we do not have the explicit Gallery width and height values yet,
   * set width & height to null (size will be handled by CSS: 100% for both)
  */
  const width = size && 'w' in size && size.w ? size.w : null;
  const height = size && 'h' in size && size.h ? size.h : null;
  /**
   * if we do not have the explicit Gallery width and height values yet,
   * Slider and Slide width will be expressed in percentage
  */
  const sliderWidth = width ? size.w * additionalSlidesForLoop : `${100 * additionalSlidesForLoop}%`;
  const slideWidth = width || `${100 / additionalSlidesForLoop}%`;
  return {
    width,
    height,
    sliderWidth,
    slideWidth,
  };
};

export const computeSlidesToLoad = (alreadyLoaded, currentSlide, totSlides, direction) => {
  const slidesToLoad = [...alreadyLoaded];
  if (slidesToLoad.length < totSlides) {
    const N = 2;
    if (slidesToLoad.indexOf(currentSlide) < 0) {
      slidesToLoad.push(currentSlide);
    }
    if (direction === 'next') {
      const nextCandidates = [...Array(N).keys()].map((_e, i) => currentSlide + (i + 1));
      nextCandidates.forEach(
        (nc) => {
          if (
            nc < totSlides
            && slidesToLoad.indexOf(nc) < 0
            && currentSlide % N === 0
            && nc - slidesToLoad.length < N
          ) {
            slidesToLoad.push(nc);
          }
        },
      );
      if (
        slidesToLoad.length === totSlides - 1
        && slidesToLoad.indexOf(0) < 0
      ) {
        slidesToLoad.push(0);
      }
    } else if (direction === 'prev') {
      if (
        currentSlide === 0
        && slidesToLoad.indexOf(totSlides - 1) < 0
        && slidesToLoad.indexOf(totSlides - 2) < 0
      ) {
        slidesToLoad.push(totSlides - 1);
        slidesToLoad.push(totSlides - 2);
      } else {
        const nextCandidates = [...Array(N).keys()].map((_e, i) => currentSlide - (i + 1));
        nextCandidates.forEach(
          (nc) => {
            if (
              nc > -1
              && slidesToLoad.indexOf(nc) < 0
              && currentSlide % N === 0
              && nc - slidesToLoad.length < N
            ) {
              slidesToLoad.push(nc);
            }
          },
        );
      }
    }
  }
  return slidesToLoad;
};

/**
  * @desc create a single Slide
  *
  * @param {object} item Slide contents
  * @param {number} index Slide position
  * @param {array || string} slideClassName Slide className or array of classNames
  * @param {object} slideSize Slide width and height
  *
  * @returns {object} Slide
  *
  * TODO: allow slide to accept plain HTML as children
*/
const createSingleSlide = (props) => {
  const {
    item,
    index,
    slideClassName,
    slideSize,
    loaded,
    item: {
      props: {
        type,
      },
    },
  } = props;
  let slide = null;
  /**
   * Slide contents are supposed to be valid React components
   */
  if (isValidElement(item)) {
    /**
     * different type of contents may need different props
     * for Gallery to display them correctly
     */
    let customStyleObj = null;
    let customWidth = null;
    let customHeight = null;
    /**
     * set up Slide style
     */
    let slideContentType = null;
    const slideStyle = {
      width: setSizeMeasureUnit(slideSize.width),
      height: setSizeMeasureUnit(slideSize.height),
    };
    switch (type) {
      /**
       * Image max-height will be equal to Slide height
       */
      case 'img':
        customStyleObj = { maxHeight: slideStyle.height };
        slideContentType = 'image';
        break;
      case 'ytvideo':
        /**
         * Style to apply to the video preview Image
         * Height is computed from Slide width / 1.77 to force 16:9
         * standard YT video ratio
         */
        customStyleObj = {
          width: slideStyle.width,
          height: setSizeMeasureUnit(Math.round(slideSize.width / 1.77)),
          maxHeight: slideStyle.height,
        };
        /**
         * Size to apply to YT Iframe
         */
        customWidth = slideStyle.width;
        customHeight = slideStyle.height;
        slideContentType = 'movie';
        slideStyle.background = '#000';
        break;
      default:
        return null;
    }
    /**
     * cloneElement is a perfectly safe & efficient way to pass
     * custom props to Slide children components
     * expecially coupled with React.memo to prevent unnecessary rerenderingù
     *
    */
    slide = (
      <Slide
        key={`slide_${index}`}
        cssClass={slideClassName}
        styleObj={slideStyle}
        type={slideContentType}
        loaded={loaded}
      >
        {cloneElement(item, { styleObj: customStyleObj, width: customWidth, height: customHeight })}
      </Slide>
    );
  }
  return slide;
};

/**
  * @desc create all Slides
  *
  * @param {boolean} domready did the first render (SSR) happen already?
  * @param {array} items Slides data collection
  * @param {array || string} slideClassName Slide className or array of classNames
  * @param {object} slideSize Slide width and height
  * @param {boolean} loop should Gallery loop?
  *
  * @returns {array} Slides collection
*/
export const createSlides = (props) => {
  const {
    domready,
    items,
    slideClassName,
    slideSize,
    loop,
    loadedSlides,
  } = props;
  let slides = null;
  /**
   * if we are dealing with SSR just print the first Slide
   * for SEO / Performances reasons
  */
  if (!domready) {
    slides = createSingleSlide({
      item: items[0],
      index: loop ? 1 : 0,
      slideClassName,
      slideSize,
      loaded: loadedSlides.indexOf(loop ? 1 : 0) > -1,
    });
  } else {
    slides = items
      .map(
        (item, index) => createSingleSlide({
          item,
          index: loop ? index + 1 : index,
          slideClassName,
          slideSize,
          loaded: loadedSlides.indexOf(loop ? index + 1 : index) > -1,
        }),
      );
    /**
     * if Gallery is supposed to loop items[0] and items[items.length -1]
     * are cloned and added to items to create the loop effect
    */
    if (loop) {
      const loopLast = createSingleSlide({
        item: items[0],
        index: (items.length + 1),
        slideClassName,
        slideSize,
        loaded: loadedSlides.indexOf(items.length + 1) > -1,
      });
      const loopFirst = createSingleSlide({
        item: items[items.length - 1],
        index: 0,
        slideClassName,
        slideSize,
        loaded: loadedSlides.indexOf(0) > -1,
      });
      slides = [loopFirst, ...slides, loopLast];
    }
  }
  return slides;
};
