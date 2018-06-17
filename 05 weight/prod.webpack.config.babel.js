const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.webpack.config.babel.js');
const CompressionPlugin = require('compression-webpack-plugin');
import webpack from 'webpack';

module.exports = webpackMerge(commonConfig, {    
  plugins: [
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),    
  ]
});
