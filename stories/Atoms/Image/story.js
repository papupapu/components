import React from 'react';

import Image from './index';

const img = 'http://localhost:8888/Img/a.jpg';
const errorimg = 'http://localhost:8888/Img/b.jpg';

export default {
  title: 'Image',
};

export const story = () => (
  <>
    <Image
      src={img}
      styleObj={[{ display: 'block', opacity: 0.5 }, true]}
    />
    <Image
      src={errorimg}
      styleObj={{ display: 'block' }}
    />
    <Image
      src={img}
    />
  </>
);
