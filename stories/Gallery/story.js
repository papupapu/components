/* eslint-disable jsx-a11y/aria-role */
import React from 'react';

import Gallery from './index';

import Slider from '../Slider';
import Image from '../Atoms/Image';
import YTVideo from '../Atoms/YTVideo';
import Button from '../Atoms/Button';
import Icon from '../Atoms/Icon';
import Panel from '../Atoms/Panel';

import UI from '../Utils/UI';

import './story.css';

export default {
  title: 'Gallery',
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
    galleryBackground: '#BFBFB9',

    galleryButtonWidth: '40px',
    galleryButtonHeight: '40px',
    galleryButtonColor: '#000',
    galleryButtonBackground: '#DFDDD3',
    galleryButtonBorderRadius: '20px',

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
    <Gallery
      ui={ui}
      size={{ w: 600, h: 400 }}
      loop
    >
      <h1 role="title">Gallery</h1>
      <Slider role="slider">
        {sliderContents(slides)}
      </Slider>
      <Button role="prevButton">
        prev
      </Button>
      <Panel role="counter" />
      <Button role="nextButton">
        next
      </Button>
      <dl role="todolist">
        <dt>TODO</dt>
        <dd>- optimize youtube preview link</dd>
        <dd>- comment Atoms</dd>
        <dd>- keep expanding themes: possibly separate child components defs</dd>
        <dd>- different slider styles (centered / 75% of slider width)</dd>
      </dl>
    </Gallery>
  );
};

export const themed = () => {
  const ui = UI();
  return (
    <Gallery
      ui={ui}
      size={{ w: 600, h: 400 }}
      loop
      theme={customtheme}
    >
      <Slider
        role="slider"
      >
        {sliderContents(slides)}
      </Slider>
      <Button role="prevButton">
        <Icon
          name="previous"
          width="30"
          height="30"
        />
      </Button>
      <Panel role="counter" />
      <Button role="nextButton">
        <Icon
          name="next"
          width="30"
          height="30"
        />
      </Button>
    </Gallery>
  );
};
