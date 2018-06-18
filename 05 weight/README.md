# Analyzing webpack bundle weight

Now we got a 30Kb library, not bad, but we have to control which code and libraries are
the ones that are making that compsumption to avoid bloating the library unnecessarily.

# Prerequisites

Ensure you have installed nodejs at least version 8.1.1.


# Steps

- We will take as starting point sample _04 github_

- Ensure you have installed the needed dependencies from that sample:

```bash
npm install
```

- Let's install a webpack module analyzer, plus a plugin to merge two webpack
files, and a plugin to generate gzipped js files:

```bash
npm install webpack-merge webpack-bundle-analyzer compression-webpack-plugin --save-dev
```

- We are going to remove _webpack.config.babel.js_ and create three configuration files.


- A base that will contain all the common settings.

_./base.webpack.config.babel.js_

```javascript
import webpack from 'webpack';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const NODE_ENV = process.env.NODE_ENV;

const basePath = __dirname;
const version = JSON.stringify(process.env.npm_package_version).replace(/"/g, '');
const filename = `simple-lib-${version}${NODE_ENV === 'production' ? '.min' : ''}.js`;

export default {
  context: path.join(basePath, 'src'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js',]
  },

  entry: {
    app: ['./index.ts'],
  },
  output: {
    path: path.join(basePath, 'build/dist'),
    filename,
    library: {
      root: 'SimpleLib',
      amd: 'simple-lib',
      commonjs: 'simple-lib',
    },
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          useBabel: true,
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader', 
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              camelCase: true
            }
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin    
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: "[id].css"
    }),        
  ],
};
```


- A production configuration that will make the build as we know it, plus include a gzipped version.

_./prod.webpack.config.babel.js_

```javascript
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
```


- A performance configuration that will run the analisys and check sizes.


_./perf.webpack.config.babel.js_

```javascript
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import commonConfig from './base.webpack.config.babel.js';
import CompressionPlugin from 'compression-webpack-plugin';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const merged = webpackMerge(commonConfig, {    
  plugins: [
    new BundleAnalyzerPlugin()
  ],
});

export default merged;
```

- Let's update the package.json entries to use the correct one on each case and add the
performance one:

_./package.json_

```diff
  "scripts": {
    "clean": "rimraf build",
    "prepublish": "npm run clean && npm run build",
    "build": "npm run clean && npm run build:commonjs && npm run build:umd && npm run build:umd:min && npm run build:es",
    "build:commonjs": "cross-env BABEL_ENV=commonjs babel src --out-dir build/lib --copy-files --ignore spec.js,test.js",
    "build:es": "cross-env BABEL_ENV=es babel src --out-dir build/es --copy-files --ignore spec.js,test.js",
-    "build:umd": "cross-env BABEL_ENV=commonjs NODE_ENV=development webpack --mode=development",
-    "build:umd:min": "cross-env BABEL_ENV=commonjs NODE_ENV=production webpack --mode=production",
-    "gallery": "npm run prepublish && webpack-dev-server --mode=development --openPage '/gallery'"
+    "build:umd": "cross-env BABEL_ENV=commonjs NODE_ENV=development webpack --mode=development --config=base.webpack.config.babel.js",
+    "build:umd:min": "cross-env BABEL_ENV=commonjs NODE_ENV=production webpack --config=prod.webpack.config.babel.js -p",
+    "build:umd:perf": "cross-env BABEL_ENV=commonjs NODE_ENV=production webpack --mode=production --config=perf.webpack.config.babel.js",
+    "gallery": "npm run prepublish && webpack-dev-server --mode=development --openPage '/gallery' --config=base.webpack.config.babel.js"
  },
```

- Let's run the gallery

```bash
npm run gallery
```

- Let's run the weight analytic plugin

```bash
npm run build:umd:perf
```
