const {root} = require('../entries');

module.exports = {
  cache: true,
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        include: [root('../src')],
        loader: 'tslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        include: [root('../src')],
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(sass|scss)$/,
        exclude: /node_modules/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]-[hash:base64:3]'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              indentedSyntax: true,
              sourceMap: true,
              sourceMapContents: true
            }
          }
        ]
      },
      {
        test: /\.html$/, // handles html files. <link rel="import" href="path.html"> and import 'path.html';
        loader: 'wc-loader'
      },
      {
        test: /\.pug$/,
        include: [root('../src')],
        loader: 'pug-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.json']
  }
};
