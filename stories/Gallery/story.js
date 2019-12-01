import React from 'react';
import { action } from '@storybook/addon-actions';

import UI from '../Utils/UI';

import Gallery from './index';

export default {
  title: 'Gallery',
};

const img = 'http://localhost:8888/Img/a.jpg';
const errorimg = 'http://localhost:8888/Img/b.jpg';

const media = [
  {
    type: 'img',
    uri: 'http://localhost:8888/Img/a.jpg',
    link: 'http://www.suca.it/',
    linkTitle: 'suca',
  },
  {
    type: 'img',
    uri: 'http://localhost:8888/Img/b.jpg',
    link: 'http://www.suca.it/',
    linkTitle: 'suca',
  },
  {
    type: 'img',
    uri: 'http://localhost:8888/Img/c.jpg',
    link: 'http://www.suca.it/',
    linkTitle: 'suca',
  },
];

export const main = () => {
  const ui = UI();
  return (
    <>
      <Gallery
        ui={ui}
        items={media}
        size={{ w: 600, h: 400 }}
      />
    </>
  );
};

export const justUrls = () => {
  const ui = UI();
  return (
    <>
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <Gallery
          ui={ui}
          items={[img, errorimg]}
          hasButtons={false}
        />
      </div>
    </>
  );
};