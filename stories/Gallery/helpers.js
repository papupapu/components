import React from 'react';

import Panel from '../Atoms/Panel';
import Image from '../Atoms/Image';

/**
  * @desc compute the panel to be shown on mount
  *
  * @param {number} startAt the index of the Gallery's panel to be shown on mount
  * @param {boolean} loop should Gallery loop?
  *
  * @returns {number} index of the panel to be shown on mount
*/
export const initialSlide = (startAt, loop) => {
  if (startAt !== 0) {
    return startAt;
  }
  /**
   * if Gallery is supposed to loop the first panel is 1
   * since 0 is the clone of the last panel (see 'createSlides' method)
  */
  return loop ? 1 : 0;
};

/**
  * @desc compute the slider initial position
  *
  * @param {boolean} loop should Gallery loop?
  * @param {object} size Gallery width and height
  * @param {array} items Gallery contents
  *
  * @returns {number} the slider initial position
  *
  * TODO:
  * - factor in optional startAt prop value
  * - add different logic for different slider type
  *   (i.e. centered panel with two showing at its sides)
*/
export const initialSliderCoords = (loop, size, items) => {
  /**
   * if Gallery is supposed to loop the first panel is 1
   * since 0 is the clone of the last panel (see 'createSlides' method)
   *
   * thus the slider's initial position will be: Gallery width * -1
  */
  if (loop) {
    if (Object.keys(size).length) {
      return size.w * -1;
    }
    /**
     * if we do not have the explicit Gallery width value yet,
     * the slider initial position will be expressed in percentage
     *
     * add 2 to items.length since items[0] and items[items.length -1]
     * are cloned and added to items to create the loop effect
    */
    return `-${100 / (items.length + 2)}%`;
  }
  return 0;
};

/**
  * @desc compute the slider current position
  *
  * @param {number} current index of the currently shown Gallery panel
  * @param {number} size Gallery width and height
  *
  * @returns {number} the slider current position
  *
  * TODO:
  * - add different logic for different slider type
  *   (i.e. centered panel with two showing at its sides)
*/
export const sliderCoords = (current, width) => (current * width) * -1;

/**
  * @desc compute the size of the slider's elements
  *
  * @param {number} size Gallery width and height
  * @param {number} itemsLength number of Gallery panels
  * @param {boolean} loop should Gallery loop?
  *
  * @returns {object} Gallery width / height, slider total width, panel width
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
   * the slider and panel width will be expressed in percentage
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
  * @desc extract the contents of a single Gallery panel
  *
  * @param {object || string} item Gallery panel contents
  *
  * @returns {object} panels contents
  *
  * TODO:
  * - expand (handle contents !== from images)
  * - possibly extract to improve Gallery flexibility
*/
const getPanelData = (item) => {
  let src = null;
  let link = null;
  let linkTitle = null;
  if (typeof item === 'string') {
    src = item;
  } else {
    src = item.uri;
    link = 'link' in item && item.link !== '' ? item.link : null;
    linkTitle = 'linkTitle' in item && item.linkTitle !== '' ? item.linkTitle : null;
  }
  return {
    src,
    link,
    linkTitle,
  };
};

/**
  * @desc create a single Gallery panel
  *
  * @param {object || string} item Gallery panel contents
  * @param {number} index Gallery panel's position
  * @param {array || string} panelClassName Gallery panel's className or array of classNames
  * @param {object} panelStyle Gallery panel inline style declaration
  *
  * @returns {object} Gallery panel
  *
  * TODO:
  * - expand (handle contents !== from images)
  * - possibly extract to improve Gallery flexibility
*/
const createSingleSlide = (props) => {
  const {
    item,
    index,
    panelClassName,
    panelStyle,
  } = props;
  const { src, link, linkTitle } = getPanelData(item);
  const slide = (
    <Panel
      key={`panel_${index}`}
      cssClass={panelClassName}
      styleObj={panelStyle}
      link={link}
      linkTitle={linkTitle}
    >
      <Image
        src={src}
        styleObj={[{ maxHeight: panelStyle.height }]}
      />
    </Panel>
  );
  return slide;
};

/**
  * @desc create all Gallery panels
  *
  * @param {boolean} domready did the first render (SSR) happen already?
  * @param {array} items Gallery contents
  * @param {array || string} panelClassName Gallery panel's className or array of classNames
  * @param {object} panelStyle Gallery panel inline style declaration
  * @param {boolean} loop should Gallery loop?
  *
  * @returns {array} Gallery panels collection
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
   * if we are dealing with SSR just print the first panel
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
