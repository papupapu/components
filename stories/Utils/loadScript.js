export default (path, clb) => new Promise((resolve, reject) => {
  const scr = document.createElement('script');
  scr.src = path;
  scr.onload = () => {
    resolve();
    if (clb && typeof clb === 'function') {
      clb();
    }
  };
  scr.onerror = reject;
  document.head.appendChild(scr);
});
