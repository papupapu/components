import React, { cloneElement, isValidElement } from 'react';

import Slide from '../Atoms/Panel';

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
  const panelWidth = width || `${100 / additionalSlidesForLoop}%`;
  return {
    width,
    height,
    sliderWidth,
    panelWidth,
  };
};

/**
  * @desc create a single Slide
  *
  * @param {object} item Slide contents
  * @param {number} index Slide position
  * @param {array || string} panelClassName Slide className or array of classNames
  * @param {object} panelStyle Slide inline style declaration
  *
  * @returns {object} Slide
*/
const createSingleSlide = (props) => {
  const {
    item,
    index,
    panelClassName,
    panelStyle,
    item: {
      props: {
        type,
      },
    },
  } = props;
  let slide = null;
  if (isValidElement(item)) {
    let customStyleObj = null;
    let customWidth = null;
    let customHeight = null;
    switch (type) {
      case 'img':
        customStyleObj = { maxHeight: panelStyle.height };
        break;
      case 'ytvideo':
        customStyleObj = { width: panelStyle.width, height: `${Math.round(panelStyle.width.replace('px', '') / 1.77)}px`, maxHeight: panelStyle.height };
        customWidth = panelStyle.width;
        customHeight = panelStyle.height;
        break;
      default:
        return null;
    }
    slide = (
      <Slide
        key={`panel_${index}`}
        cssClass={panelClassName}
        styleObj={panelStyle}
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
  * @param {array || string} panelClassName Slide className or array of classNames
  * @param {object} panelStyle Slide inline style declaration
  * @param {boolean} loop should Gallery loop?
  *
  * @returns {array} Slides collection
*/
export const createSlides = (props) => {
  const {
    domready,
    items,
    panelClassName,
    panelStyle,
    loop,
  } = props;
  let slides = null;
  /**
   * if we are dealing with SSR just print the first Slide
   * for SEO / Performances reasons
  */
  if (!domready) {
    slides = createSingleSlide({
      item: items[0],
      index: 'noindex',
      panelClassName,
      panelStyle,
    });
  } else {
    slides = items
      .map(
        (item, index) => createSingleSlide({
          item,
          index,
          panelClassName,
          panelStyle,
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
        panelClassName,
        panelStyle,
      });
      const loopFirst = createSingleSlide({
        item: items[items.length - 1],
        index: (items.length + 2),
        panelClassName,
        panelStyle,
      });
      slides = [loopFirst, ...slides, loopLast];
    }
  }
  return slides;
};
