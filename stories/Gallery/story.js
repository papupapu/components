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
    type: 'img',
    uri: 'http://localhost:8888/Img/d.jpg',
    link: '#',
    linkTitle: 'suca',
  },
  {
    type: 'ytvideo',
    ytvideoid: '0rfhC4hT5O4',
  },
  {
    type: 'img',
    uri: 'http://localhost:8888/Img/a.jpg',
    link: '#',
    linkTitle: 'suca',
  },
  {
    type: 'img',
    uri: 'http://localhost:8888/Img/b.jpg',
    link: '#',
    linkTitle: 'suca',
  },
  {
    type: 'img',
    uri: 'http://localhost:8888/Img/c.jpg',
    link: '#',
    linkTitle: 'suca',
  },
  {
    type: 'img',
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
      case 'img':
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
  return (
    <>
      <dl style={{ marginTop: '450px' }}>
        <dt>TODO</dt>
        <dd>- check if useMemo is better than memo for Panel rerender prevention</dd>
        <dd>- check if is it possible to prevent buttons rerender</dd>
        <dd>- find way to externalize buttons</dd>
        <dd>- comment Atoms</dd>
        <dd>- touch events</dd>
        <dd>- panels lazyloading (apply spinner)</dd>
        <dd>- panels may have different needs depending on their contents</dd>
        <dd>- different slider styles (centered / 75% of gallery width)</dd>
      </dl>
      <Gallery
        ui={ui}
        size={{ w: 600, h: 400 }}
        loop
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
