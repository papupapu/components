/**
  * @desc universal event preventDefault
  *
  * @param {event} e the event to prevent from firing
*/
const preventDefault = (e) => {
  const evt = e || window.event;
  if (evt.preventDefault) {
    evt.preventDefault();
  }
  evt.returnValue = false;
};

/**
  * @desc disable window scroll
*/
export const disableScroll = () => {
  if (window.addEventListener) {
    window.addEventListener('scroll', preventDefault, false);
  }
  window.ontouchmove = preventDefault;
};

/**
  * @desc enable window scroll
*/
export const enableScroll = () => {
  if (window.removeEventListener) {
    window.removeEventListener('scroll', preventDefault, false);
  }
  window.ontouchmove = null;
};
