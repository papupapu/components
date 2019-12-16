import React from 'react';

import Spinner from './index';

export default {
  title: 'Spinner',
};

export const main = () => (
  <>
    <p>Spinner</p>
    <Spinner />
  </>
);

export const custom = () => (
  <>
    <p>Spinner</p>
    <Spinner
      width={40}
      height={40}
      strokeWidth={2}
      color="#f90"
    />
  </>
);
