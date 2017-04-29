const path = require('path');
const root = (__path) => path.join(__dirname, __path);

const entries = {
    polyfill: root('../demo/polyfill'),
    vendor: root('../demo/vendor'),
    main: root('../demo/main')
};

module.exports = {path, root, entries};
