import React from 'react';

import UI from '../Utils/UI';

import Gallery from './index';

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
];

export const main = () => {
  const ui = UI();
  return (
    <>
      <dl style={{ marginTop: '450px' }}>
        <dt>TODO</dt>
        <dd>- start commenting the code</dd>
        <dd>- solve drag glitches - sometimes pointer events none on Panel is no reset to all</dd>
        <dd>- touch events</dd>
        <dd>- panels lazyloading</dd>
        <dd>- different media support</dd>
      </dl>
      <Gallery
        ui={ui}
        items={media}
        size={{ w: 600, h: 400 }}
        loop
      />
    </>
  );
};

export const startAt = () => {
  const ui = UI();
  return (
    <Gallery
      ui={ui}
      items={media}
      size={{ w: 600, h: 400 }}
      startAt={2}
      loop
    />
  );
};

export const looping = () => {
  const ui = UI();
  return (
    <Gallery
      ui={ui}
      items={media}
      size={{ w: 600, h: 400 }}
      loop
    />
  );
};

export const nobuttons = () => {
  const ui = UI();
  return (
    <Gallery
      ui={ui}
      items={media}
      size={{ w: 600, h: 400 }}
      hasButtons={false}
    />
  );
};

export const justUrls = () => {
  const ui = UI();
  return (
    <Gallery
      ui={ui}
      items={['http://localhost:8888/Img/d.jpg', 'http://localhost:8888/Img/a.jpg', 'http://localhost:8888/Img/b.jpg']}
      size={{ w: 600, h: 400 }}
    />
  );
};

export const fullscreen = () => {
  const ui = UI();
  return (
    <Gallery
      ui={ui}
      items={media}
      loop
      fullscreen
    />
  );
};

export const responsive = () => {
  const ui = UI();
  return (
    <div className="responsivecontainer">
      <Gallery
        ui={ui}
        items={media}
        loop
      />
    </div>
  );
};
