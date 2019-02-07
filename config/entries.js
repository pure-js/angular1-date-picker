const path = require('path');
const root = (__path) => path.join(__dirname, __path);

const entries = {
  vendor: root('../demo/vendor'),
  main: root('../demo/main')
};

module.exports = {path, root, entries};
