const webpack = require('webpack');
const path = require('path');

const APP_DIR = path.resolve(__dirname, 'client/src/');
const BUILD_DIR = path.resolve(__dirname, 'client/dist');

module.exports = {
  entry: `${APP_DIR}/index.jsx`,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'env']
        }
      }
    ]
  }
};
