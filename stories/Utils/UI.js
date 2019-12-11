/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';

import debounce from './debounce';

/**
  * @desc user's device infos sniffing
  *
  * @returns {object} relevant user's device infos
  *
  * TODO:
  * - improve userAgent sniffing
  * - improve device recognition by window size if possible
*/
export default () => {
  /**
   * set ui object default structure at mount
  */
  const [ui, setUi] = useState({
    device: '',
    viewport: { width: null, height: null },
    touchscreen: null,
    orientation: null,
    mobileOs: null,
  });

  /**
   * effect running after first mount when the DOM is ready
  */
  useEffect(
    () => {
      /**
       * device infos sniffing
      */
      const computeUI = () => {
        /**
         * window size
        */
        const { innerWidth, innerHeight } = window;
        /**
         * has the device touchscreen functionality?
        */
        const touchscreen = 'ontouchstart' in window
          || navigator.maxTouchPoints > 0
          || 'msMaxTouchPoints' in navigator;
        /**
         * device orientation, if available
        */
        const orientation = 'orientation' in window && window.orientation;
        /**
         * initialize device as desktop
        */
        let device = 'desktop';
        /**
         * initialize mobileOs as null
        */
        let mobileOs = null;
        /**
         * is the device an ipad?
        */
        if (navigator.userAgent.indexOf('iPad') > -1) {
          device = 'tablet';
          mobileOs = 'ios';
          /**
           * is the device an iphone?
          */
        } else if (navigator.userAgent.indexOf('iPhone') > -1) {
          device = 'mobile';
          mobileOs = 'ios';
          /**
           * has the device touchscreen functionality?
          */
        } else if (touchscreen) {
          /**
           * check if it is and android device
          */
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
              && innerHeight <= 812 // iphone x height
            )
            || (
              innerWidth <= 812 // iphone x height
              && innerHeight >= 360
              && innerHeight < 768
            )
          ) {
            device = 'mobile';
          }
          /**
           * no mobile os detected
           * assume it a desktop window resized, still apply
           * tablet / smarpthone functionality or style
          */
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
      };
      computeUI();
      /**
       * listen to window resize event to update ui values
       * apply debounce to avoid capturing the event every single time it fires
      */
      const debouncedComputeUI = debounce(() => { computeUI(); }, 300);
      window.addEventListener('resize', debouncedComputeUI);
      return () => {
        window.removeEventListener('resize', debouncedComputeUI);
      };
    }, [],
  );
  return ui;
};
