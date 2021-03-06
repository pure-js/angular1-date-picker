const {distPath, publicPath} = require('../shared');
const {root, entries:entry} = require('../entries');

const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProvidePlugin = webpack.ProvidePlugin

module.exports = {
  entry,
  output: {
    filename: '[name].js',
    path: distPath,
    publicPath
  },
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
        enforce: 'pre',
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        enforce: 'pre',
        test: /\.ts$/,
        use: "source-map-loader"
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: "file-loader"
      },
      {
        test: /\.html$/, // handles html files. <link rel="import" href="path.html"> and import 'path.html';
        loader: 'wc-loader'
      },
      {
        test: /\.(pug|jade)$/,
        use: ['raw-loader', 'pug-html-loader']
      },
      {
        test: /uifr-app.html$/, // replace broken css links
        loader: 'string-replace-loader',
        options: {
          search: '../uifr-core-style/resources/css',
          replace: './styles/css',
          flags: 'g'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './demo/index.pug'
    }),
    new ProvidePlugin({
      "window.Q": "Q",
      "Q": "Q"
    }),
    new CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.js",
      minChunks: 2
    }),
    new ExtractTextPlugin("styles.css")
  ],
  devServer: {
    hot: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 500
    },
    stats: 'errors-only',
    contentBase: distPath,
    publicPath
  }
};
