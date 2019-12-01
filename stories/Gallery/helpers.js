import React from 'react';

import Panel from '../Atoms/Panel';
import Image from '../Atoms/Image';

export const getElementsSizes = (size, itemsLength) => {
  const width = size && 'w' in size && size.w ? size.w : null;
  const height = size && 'h' in size && size.h ? size.h : null;
  const sliderWidth = width ? size.w * itemsLength : `${100 * itemsLength}%`;
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

export const createSlides = (props) => {
  const {
    domready,
    items,
    panelClassName,
    panelStyle,
  } = props;

  let slides = null;

  if (!domready) {
    const { src, link, linkTitle } = getPanelData(items[0]);
    slides = (
      <Panel
        cssClass={panelClassName}
        styleObj={panelStyle}
        link={link}
        linkTitle={linkTitle}
      >
        <Image src={src} />
      </Panel>
    );
  } else {
    slides = items
      .map(
        (item) => {
          const { src, link, linkTitle } = getPanelData(item);
          return (
            <Panel
              cssClass={panelClassName}
              styleObj={panelStyle}
              link={link}
              linkTitle={linkTitle}
            >
              <Image src={src} />
            </Panel>
          );
        },
      );
  }
  return slides;
};
