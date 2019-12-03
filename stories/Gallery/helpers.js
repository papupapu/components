import React from 'react';

import Panel from '../Atoms/Panel';
import Image from '../Atoms/Image';

export const getElementsSizes = (size, itemsLength, loop) => {
  const additionalSlidesForLoop = loop ? 2 : 0;
  const width = size && 'w' in size && size.w ? size.w : null;
  const height = size && 'h' in size && size.h ? size.h : null;
  const sliderWidth = width ? size.w * (itemsLength + additionalSlidesForLoop) : `${100 * itemsLength}%`;
  const panelWidth = width || `${100 / itemsLength}%`;
  return {
    width,
    height,
    sliderWidth,
    panelWidth,
  };
};

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

export const createSlides = (props) => {
  const {
    domready,
    items,
    panelClassName,
    panelStyle,
    loop,
  } = props;
  let slides = null;
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
