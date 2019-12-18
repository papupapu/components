/**
  * @desc inject link tag in document head
  *
  * @param {string} path url of the resource to inject
  * @param {string} rel rel attribute of the link tag to inject
*/
export default (path, { rel = 'stylesheet' } = {}) => {
  const link = document.createElement('link');
  link.href = path;
  link.rel = rel;
  document.head.appendChild(link);
};
