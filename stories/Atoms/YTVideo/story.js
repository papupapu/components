import React from 'react';

import YTVideo from './index';

const ytvideoid = 'nwI-MrUCtkk';

export default {
  title: 'YTVideo',
};

export const story = () => (
  <div style={{ width: '600px', height: '400px' }}>
    <YTVideo
      ytvideoid={ytvideoid}
      width={600}
      height={400}
    />
  </div>
);


export const styleObj = () => (
  <div style={{ width: '600px', height: '400px' }}>
    <YTVideo
      ytvideoid={ytvideoid}
      styleObj={{ width: '600px', height: '400px' }}
    />
  </div>
);
