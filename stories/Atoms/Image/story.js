import React from 'react';

import Image from './index';

const imgA = 'http://localhost:8888/Img/a.jpg';
const imgB = 'http://localhost:8888/Img/b.jpg';
const errorimg = 'http://localhost:8888/Img/error.jpg';

export default {
  title: 'Image',
};

export const story = () => (
  <>
    <p>Default image: size w400px</p>
    <Image
      src={imgA}
      width={400}
    />
    <p>Image with force opacity: size w400px</p>
    <Image
      src={imgB}
      width={400}
      styleObj={[{ display: 'block', opacity: 0.5 }, true]}
    />
    <p>Image onError example: size w400px</p>
    <Image
      src={errorimg}
      width={400}
      height={225}
    />
  </>
);
