import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import commonConfig from './base.webpack.config.babel.js';
import CompressionPlugin from 'compression-webpack-plugin';

const merged = webpackMerge(commonConfig, {    
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

export default merged; 


