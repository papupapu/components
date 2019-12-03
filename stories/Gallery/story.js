import React from 'react';
import { action } from '@storybook/addon-actions';

import UI from '../Utils/UI';

import Gallery from './index';

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
      <dl style={{ marginTop: '400px' }}>
        <dt>TODO</dt>
        <dt>- responsive</dt>
        <dt>- initial current prop</dt>
        <dt>- start commenting the code</dt>
        <dt>- different media support </dt>
      </dl>
      <Gallery
        ui={ui}
        items={media}
        size={{ w: 600, h: 400 }}
      />
    </>
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
    />
  );
};
