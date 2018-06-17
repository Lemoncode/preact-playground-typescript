const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.webpack.config.babel.js');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
import webpack from 'webpack';

module.exports = webpackMerge.strategy({
  entry: 'prepend',
})(commonConfig, {    
  plugins: [
    new BundleAnalyzerPlugin()
  ],
});
