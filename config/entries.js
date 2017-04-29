const path = require('path');
const root = (__path) => path.join(__dirname, __path);

const entries = {
    polyfill: root('../src/polyfill'),
    vendor: root('../src/vendor'),
    main: root('../src/main')
};

module.exports = {path, root, entries};
