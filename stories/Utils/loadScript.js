/**
  * @desc inject script tag in document head
  *
  * @param {string} path url of the resource to inject
  * @param {functions} clb optional callback to fire once the script is loaded
*/
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
