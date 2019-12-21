import React from 'react';

import UI from '../Utils/UI';
import Slider from './index';
import Image from '../Atoms/Image';
import YTVideo from '../Atoms/YTVideo';

import './story.css';

export default {
  title: 'Slider',
};

const slides = [
  {
    type: 'image',
    uri: 'http://localhost:8888/Img/d.jpg',
    link: '#',
    linkTitle: 'suca',
  },
  {
    type: 'ytvideo',
    ytvideoid: '0rfhC4hT5O4',
  },
  {
    type: 'image',
    uri: 'http://localhost:8888/Img/a.jpg',
    link: '#',
    linkTitle: 'suca',
  },
  {
    type: 'image',
    uri: 'http://localhost:8888/Img/b.jpg',
    link: '#',
    linkTitle: 'suca',
  },
  {
    type: 'image',
    uri: 'http://localhost:8888/Img/c.jpg',
    link: '#',
    linkTitle: 'suca',
  },
  {
    type: 'image',
    uri: 'http://localhost:8888/Img/error.jpg',
    link: '#',
    linkTitle: 'suca',
  },
  {
    type: 'ytvideo',
    ytvideoid: 'nwI-MrUCtkk',
  },
];

const sliderContents = (data) => data.map(
  (el) => {
    switch (el.type) {
      case 'image':
        return (
          <Image
            key={el.uri}
            type={el.type}
            src={el.uri}
            link={el.link}
            linkTitle={el.linkTitle}
          />
        );
      case 'ytvideo':
        return (
          <YTVideo
            key={el.ytvideoid}
            type={el.type}
            ytvideoid={el.ytvideoid}
          />
        );
      default:
        return null;
    }
  },
).filter(Boolean);

const customtheme = {
  custom: {
    sliderBackground: '#DFDDD3',
    sliderBorderRadius: '10px',
    loadingImagePlaceHolderColor: '#BFBFB9',
    videoSlideBackground: '#000',
    videoPreviewIconColor: '#FFF',
    videoPreviewLoadingColor: '#BFBFB9',
  },
};

export const main = () => {
  const ui = UI();
  return (
    <Slider
      ui={ui}
      size={{ w: 600, h: 400 }}
      loop
    >
      {sliderContents(slides)}
    </Slider>
  );
};


export const themed = () => {
  const ui = UI();
  return (
    <>
      <Slider
        ui={ui}
        size={{ w: 600, h: 400 }}
        loop
        theme={customtheme}
      >
        {sliderContents(slides)}
      </Slider>
    </>
  );
};

export const startAt = () => {
  const ui = UI();
  return (
    <Slider
      ui={ui}
      size={{ w: 600, h: 400 }}
      startAt={2}
      loop
    >
      {sliderContents(slides)}
    </Slider>
  );
};

export const notlooping = () => {
  const ui = UI();
  return (
    <Slider
      ui={ui}
      size={{ w: 600, h: 400 }}
    >
      {sliderContents(slides)}
    </Slider>
  );
};

export const responsive = () => {
  const ui = UI();
  return (
    <div className="responsivecontainer">
      <Slider
        ui={ui}
        loop
      >
        {sliderContents(slides)}
      </Slider>
    </div>
  );
};

export const fullscreen = () => {
  const ui = UI();
  return (
    <Slider
      ui={ui}
      loop
      fullscreen
      theme={customtheme}
    >
      {sliderContents(slides)}
    </Slider>
  );
};
