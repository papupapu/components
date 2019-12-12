import React from 'react';

import YTVideo from './index';

const ytvideoid = 'nwI-MrUCtkk';

export default {
  title: 'YTVideo',
};

export const story = () => (
  <YTVideo
    ytvideoid={ytvideoid}
    width={600}
    height={400}
  />
);


export const styleObj = () => (
  <YTVideo
    ytvideoid={ytvideoid}
    styleObj={{ width: '600px', height: '400px' }}
  />
);
