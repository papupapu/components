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
    galleryPadding: '10px',
    galleryBackground: '#BFBFB9',

    galleryControlsMargin: '10px 0 0',
    galleryControlsPadding: '10px',
    galleryControlsWidth: 'auto',
    galleryControlsBackground: '#DFDDD3',
    galleryControlsBorderRadius: '10px',

    galleryButtonWidth: '40px',
    galleryButtonHeight: '40px',
    galleryButtonColor: '#000',
    galleryButtonBackground: '#BFBFB9',
    galleryButtonBorderRadius: '20px',

    galleryCounterPadding: '0 20px',
    galleryCounterBackground: '#BFBFB9',
    galleryCounterBorderRadius: '10px',

    sliderBackground: '#DFDDD3',
    sliderBorderRadius: '10px',
    loadingImagePlaceHolderColor: '#BFBFB9',
    videoSlideBackground: '#000',
    videoPreviewIconColor: '#FFF',
    videoPreviewLoadingColor: '#BFBFB9',
  },
};

const customtheme2 = {
  custom: {
    galleryPadding: '10px',
    galleryBackground: '#BFBFB9',

    galleryControlsMargin: '0 0 10px',
    galleryControlsWidth: 'auto',

    galleryButtonWidth: '40px',
    galleryButtonHeight: '40px',
    galleryButtonColor: '#000',
    galleryButtonBackground: '#BFBFB9',
    galleryButtonBorderRadius: '20px',

    galleryCounterPadding: '0 20px',
    galleryCounterBackground: '#BFBFB9',
    galleryCounterBorderRadius: '10px',

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
      <h1>Gallery</h1>
      <Slider role="slider">
        {sliderContents(slides)}
      </Slider>
      <Button role="prevButton">
        prev
      </Button>
      <Panel role="counter"><p /></Panel>
      <Button role="nextButton">
        next
      </Button>
      <dl>
        <dt>TODO</dt>
        <dd>- Gallery: size prop...</dd>
        <dd>- Gallery: counter undefined child prop problem</dd>
        <dd>- Gallery: lazyload should just print startAt panel at load (find convenient logic)</dd>
        <dd>- YTVideo: prev/next buttons must be available</dd>
        <dd>- YTVideo: optimize preview link</dd>
        <dd>- Gallery: dots navigator</dd>
        <dd>- Gallery: controls &amp; dots navigator should have an optional position prop</dd>
        <dd>- Gallery / Slider / Atoms / Utils: comment code!</dd>
        <dd>- 360Pics - create component</dd>
        <dt>PHASE 2</dt>
        <dd>- Theme: explore media queries</dd>
        <dd>- Theme: separate child components defs? in case, how?</dd>
        <dd>- Theme: explore importing from different project</dd>
        <dd>
          - Gallery: responsive - behaviour now smooth,
          is it possible to work on UI debounce timing + some kind of trick to optimize?
        </dd>
        <dd>- Slider: allow different ux types (centered / 75% of slid  er width)</dd>
      </dl>
    </Gallery>
  );
};

export const themed = () => {
  const ui = UI();
  return (
    <div style={{ height: '100vh' }}>
      <Gallery
        ui={ui}
        loop
        theme={customtheme}
      >
        <Slider
          role="slider"
        >
          {sliderContents(slides)}
        </Slider>
        <Panel role="controls">
          <Button role="prevButton">
            <Icon
              name="previous"
              width="30"
              height="30"
            />
          </Button>
          <Panel role="counter"><p /></Panel>
          <Button role="nextButton">
            <Icon
              name="next"
              width="30"
              height="30"
            />
          </Button>
        </Panel>
      </Gallery>
    </div>
  );
};

export const themed2 = () => {
  const ui = UI();
  return (
    <div style={{ height: '100vh' }}>
      <Gallery
        ui={ui}
        loop
        theme={customtheme2}
      >
        <Panel role="controls">
          <Panel role="counter"><p /></Panel>
          <Button
            role="prevButton"
            styleObj={{
              marginLeft: 'auto',
            }}
          >
            <Icon
              name="previous"
              width="30"
              height="30"
            />
          </Button>
          <Button role="nextButton">
            <Icon
              name="next"
              width="30"
              height="30"
            />
          </Button>
        </Panel>
        <Slider
          role="slider"
        >
          {sliderContents(slides)}
        </Slider>
      </Gallery>
    </div>
  );
};

export const themed3 = () => {
  const ui = UI();
  return (
    <div style={{ height: '100vh' }}>
      <Gallery
        ui={ui}
        loop
        theme={customtheme2}
      >
        <Panel role="controls">
          <Button role="prevButton">
            <Icon
              name="previous"
              width="30"
              height="30"
            />
          </Button>
          <Button
            role="nextButton"
            styleObj={{
              marginRight: 'auto',
            }}
          >
            <Icon
              name="next"
              width="30"
              height="30"
            />
          </Button>
          <Panel role="counter"><p /></Panel>
        </Panel>
        <Slider
          role="slider"
        >
          {sliderContents(slides)}
        </Slider>
      </Gallery>
    </div>
  );
};

export const insideContainer = () => {
  const ui = UI();
  return (
    <div className="galleryResponsiveContainer">
      <Gallery
        ui={ui}
        loop
        theme={customtheme}
      >
        <Slider
          role="slider"
        >
          {sliderContents(slides)}
        </Slider>
      </Gallery>
    </div>
  );
};

export const insideContainerWithControls = () => {
  const ui = UI();
  return (
    <div className="galleryResponsiveContainer">
      <Gallery
        ui={ui}
        loop
        theme={customtheme}
      >
        <Slider
          role="slider"
        >
          {sliderContents(slides)}
        </Slider>
        <Panel role="controls">
          <Button role="prevButton">
            <Icon
              name="previous"
              width="30"
              height="30"
            />
          </Button>
          <Panel role="counter"><p /></Panel>
          <Button role="nextButton">
            <Icon
              name="next"
              width="30"
              height="30"
            />
          </Button>
        </Panel>
      </Gallery>
    </div>
  );
};
