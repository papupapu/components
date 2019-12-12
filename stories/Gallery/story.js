import React from 'react';

import UI from '../Utils/UI';
import Gallery from './index';
import Image from '../Atoms/Image';

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
        <dd>- toil and finish and comment Atoms + complete commenting the code</dd>
        <dd>- touch events</dd>
        <dd>- check memo to prevent rerender</dd>
        <dd>- panels lazyloading</dd>
        <dd>- different media support</dd>
      </dl>
      <Gallery
        ui={ui}
        size={{ w: 600, h: 400 }}
        loop
      >
        {
          media.map(
            (el) => el.img && <Image key={el.uri} src={el.uri} />,
          )
        }
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
      {
        media.map(
          (el) => el.img && <Image key={el.uri} src={el.uri} />,
        )
      }
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
      {
        media.map(
          (el) => el.img && <Image key={el.uri} src={el.uri} />,
        )
      }
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
      {
        media.map(
          (el) => el.img && <Image key={el.uri} src={el.uri} />,
        )
      }
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
      {
        media.map(
          (el) => el.img && <Image key={el.uri} src={el.uri} />,
        )
      }
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
        {
          media.map(
            (el) => el.img && <Image key={el.uri} src={el.uri} />,
          )
        }
      </Gallery>
    </div>
  );
};
