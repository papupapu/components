/* eslint-disable react/jsx-one-expression-per-line */
// https://material.io/resources/icons/?style=round
import React from 'react';

const icons = {
  movie: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M18 4l1.8 3.6c.1.2 0 .4-.2.4h-2a1 1 0 01-.9-.6L15 4h-2l1.8 3.6c.1.2 0 .4-.2.4h-2a1 1 0 01-.9-.6L10 4H8l1.8 3.6c.1.2 0 .4-.2.4h-2a1 1 0 01-.9-.6L5 4H4a2 2 0 00-2 2v12c0 1.1.9 2 2 2h16a2 2 0 002-2V5c0-.6-.5-1-1-1h-3z" /></svg>,
  image: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14c0 1.1.9 2 2 2h14a2 2 0 002-2zM8.9 14l2.1 2.5 3.1-4c.2-.2.6-.2.8 0l3.5 4.7c.3.3 0 .8-.4.8H6a.5.5 0 01-.4-.8L8.1 14c.2-.3.6-.3.8 0z" /></svg>,
  previous: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.7 15.9L10.8 12l4-3.9a1 1 0 10-1.5-1.4l-4.6 4.6a1 1 0 000 1.4l4.6 4.6c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4z" /></svg>,
  next: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.3 15.9l3.9-3.9-4-3.9a1 1 0 111.5-1.4l4.6 4.6c.4.4.4 1 0 1.4l-4.6 4.6a1 1 0 01-1.4 0 1 1 0 010-1.4z" /></svg>,
  play: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-2 13.5v-7c0-.4.5-.7.8-.4l4.7 3.5c.2.2.2.6 0 .8l-4.7 3.5c-.3.3-.8 0-.8-.4z" /></svg>,
  brokenImage: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M21 5v6.6l-2.3-2.3a1 1 0 00-1.4 0L14 12.6l-3.3-3.3a1 1 0 00-1.4 0L6 12.6l-3-3V5c0-1.1.9-2 2-2h14a2 2 0 012 2zm-3 6.4l3 3V19a2 2 0 01-2 2H5a2 2 0 01-2-2v-6.6l2.3 2.3c.4.4 1 .4 1.4 0l3.3-3.3 3.3 3.3c.4.4 1 .4 1.4 0l3.3-3.3z" /></svg>,
};

Object.keys(icons).forEach(
  (name) => {
    const Icon = icons[name];
    icons[name] = (props) => ({
      ...Icon,
      props: { ...Icon.props, ...props },
    });
  },
);

export default icons;
