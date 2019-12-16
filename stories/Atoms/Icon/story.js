import React from 'react';

import Icon from './index';

export default {
  title: 'Icon',
};

export const main = () => (
  <>
    <p>Image icon</p>
    <Icon
      name="image"
      width={40}
      height={40}
    />
  </>
);

export const mainStroke = () => (
  <>
    <p>Image icon - added stroke</p>
    <Icon
      name="image"
      width={40}
      height={40}
      cssClass="addStroke"
    />
  </>
);

export const movie = () => (
  <>
    <p>Movie icon</p>
    <Icon
      name="movie"
      width={40}
      height={40}
    />
  </>
);

export const Previous = () => (
  <>
    <p>Previous icon</p>
    <Icon
      name="previous"
      width={40}
      height={40}
    />
  </>
);

export const next = () => (
  <>
    <p>Next icon</p>
    <Icon
      name="next"
      width={40}
      height={40}
    />
  </>
);

export const play = () => (
  <>
    <p>Play icon</p>
    <Icon
      name="play"
      width={40}
      height={40}
    />
  </>
);

export const brokenImage = () => (
  <>
    <p>Broken image icon</p>
    <Icon
      name="brokenImage"
      width={40}
      height={40}
    />
  </>
);
