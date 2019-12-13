export default (path, { rel = 'stylesheet' } = {}) => {
  const link = document.createElement('link');
  link.href = path;
  link.rel = rel;
  document.head.appendChild(link);
};
