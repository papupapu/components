/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';

export default () => {
  const [ui, setUi] = useState({
    device: '',
    viewport: { width: null, height: null },
    touchscreen: null,
    orientation: null,
    mobileOs: null,
  });
  useEffect(
    () => {
      const { innerWidth, innerHeight } = 'parent' in window ? window.parent : window;
      const touchscreen = 'ontouchstart' in window
        || navigator.maxTouchPoints > 0
        || 'msMaxTouchPoints' in navigator;
      const orientation = 'orientation' in window && window.orientation;
      let device = 'desktop';
      let mobileOs = null;
      if (navigator.userAgent.indexOf('iPad') > -1) {
        device = 'tablet';
        mobileOs = 'ios';
      } else if (navigator.userAgent.indexOf('iPhone') > -1) {
        device = 'mobile';
        mobileOs = 'ios';
      } else if (touchscreen) {
        if (navigator.userAgent.indexOf('Android') > -1) {
          mobileOs = 'android';
        }
        if (
          (
            innerWidth >= 768
            && innerHeight <= 1024
          )
          || (
            innerWidth <= 1024
            && innerHeight >= 768
          )
        ) {
          device = 'tablet';          
        } else if (
          (
            innerWidth < 768
            && innerWidth >= 360
            && innerHeight <= 812
          )
          || (
            innerWidth <= 812
            && innerHeight >= 360
            && innerHeight < 768
          )
        ) {
          device = 'mobile';
        }
      } else if (innerWidth <= 768) {
        device = 'tablet';
      } else if (innerWidth <= 414) {
        device = 'mobile';
      }
      setUi({
        device,
        viewport: { width: innerWidth, height: innerHeight },
        touchscreen,
        orientation,
        mobileOs,
      });
    }, [],
  );
  return ui;
};
