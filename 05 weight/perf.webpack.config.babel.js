import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import commonConfig from './base.webpack.config.babel.js';
import CompressionPlugin from 'compression-webpack-plugin';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const merged = webpackMerge.strategy({
  entry: 'prepend',
})(commonConfig, {    
  plugins: [
    new BundleAnalyzerPlugin()
  ],
});

export default merged;
