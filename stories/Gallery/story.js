import React from 'react';

import UI from '../Utils/UI';
import Gallery from './index';
import Image from '../Atoms/Image';
import YTVideo from '../Atoms/YTVideo';

import './story.css';

export default {
  title: 'Gallery',
};

const media = [
  {
    type: 'img',
    uri: 'http://localhost:8888/Img/d.jpg',
    link: '#',
    linkTitle: 'suca',
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
          />
        );
      case 'ytvideo':
        return (
          <YTVideo
            key={el.id}
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
        <dd>- comment Atoms</dd>
        <dd>- touch events</dd>
        <dd>- check memo to prevent rerender</dd>
        <dd>- panels lazyloading</dd>
      </dl>
      <Gallery
        ui={ui}
        size={{ w: 600, h: 400 }}
        loop
      >
        {galleryChildren(media)}
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
      {galleryChildren(media)}
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
      {galleryChildren(media)}
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
      {galleryChildren(media)}
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
      {galleryChildren(media)}
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
        {galleryChildren(media)}
      </Gallery>
    </div>
  );
};
