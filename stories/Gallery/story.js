import React from 'react';

import UI from '../Utils/UI';
import Gallery from './index';
import Image from '../Atoms/Image';
import YTVideo from '../Atoms/YTVideo';

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

const galleryChildren = (data) => data.map(
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

export const main = () => {
  const ui = UI();
  const theme = {
    custom: {
      galleryBackground: '#DFDDD3',
      galleryBorderRadius: '10px',
      loadingImagePlaceHolderColor: '#BFBFB9',
      videoSlideBackground: '#000',
      videoPreviewIconColor: '#FFF',
      videoPreviewLoadingColor: '#BFBFB9',
    },
  };
  return (
    <>
      <dl style={{ marginTop: '450px' }}>
        <dt>TODO</dt>
        <dd>- comment Atoms</dd>
        <dd>- keep expanding themes</dd>
        <dd>- different slider styles (centered / 75% of gallery width)</dd>
        <dt>PHASE 2</dt>
        <dd>- Gallery shoud be father component including optionally:</dd>
        <dd>&nbsp;&nbsp;Slider, Buttons, Thumbnails</dd>
        <dd>&nbsp;&nbsp;-- shared current prop?</dd>
        <dd>&nbsp;&nbsp;-- Context API?</dd>
      </dl>
      <Gallery
        ui={ui}
        size={{ w: 600, h: 400 }}
        loop
        theme={theme}
      >
        {galleryChildren(slides)}
      </Gallery>
    </>
  );
};

export const startAt = () => {
  const ui = UI();
  return (
    <Gallery
      ui={ui}
      size={{ w: 600, h: 400 }}
      startAt={2}
      loop
    >
      {galleryChildren(slides)}
    </Gallery>
  );
};

export const looping = () => {
  const ui = UI();
  return (
    <Gallery
      ui={ui}
      size={{ w: 600, h: 400 }}
      loop
    >
      {galleryChildren(slides)}
    </Gallery>
  );
};

export const nobuttons = () => {
  const ui = UI();
  return (
    <Gallery
      ui={ui}
      size={{ w: 600, h: 400 }}
      hasButtons={false}
    >
      {galleryChildren(slides)}
    </Gallery>
  );
};

export const fullscreen = () => {
  const ui = UI();
  return (
    <Gallery
      ui={ui}
      loop
      fullscreen
    >
      {galleryChildren(slides)}
    </Gallery>
  );
};

export const responsive = () => {
  const ui = UI();

  return (
    <div className="responsivecontainer">
      <Gallery
        ui={ui}
        loop
      >
        {galleryChildren(slides)}
      </Gallery>
    </div>
  );
};
