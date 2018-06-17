# Simple app

Let's create a hello world preact application

# Prerequisites

Ensure you have installed nodejs at least version 8.1.1.


# Steps

- Let's start by initializining an npm project:

```bash
npm init
```

- Let's install the following dev dependencies:

- Webpack

```bash
npm install webpack webpack-cli webpack-dev-server --save-dev
```

- Typings:

```
npm install @types/webpack-env --save-dev
```

- Typescript

```bash
npm install typescript --save-dev
```

- Babel configuration

```bash
npm install babel-core babel-cli babel-plugin-transform-react-jsx babel-preset-env babel-preset-preact babel-preset-react --save-dev
```


- Webpack loaders

```bash
npm install awesome-typescript-loader babel-core babel-loader css-loader file-loader sass-loader style-loader url-loader --save-dev
```

- Webpack plugins and utils

```bash
npm install copyfiles cross-env node-sass rimraf mini-css-extract-plugin html-webpack-plugin --save-dev
```

- Let's install preact:

```bash
npm install preact --save
```

- Let's confiure typescript tsconfig file:

_./tsconfig.json_

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "moduleResolution": "node",
    "declaration": false,
    "noImplicitAny": false,
    "jsx": "react",
    "jsxFactory": "h",
    "sourceMap": true,
    "noLib": false,
    "suppressImplicitAnyIndexErrors": true,
    "allowJs": true
  },
  "compileOnSave": false,
  "exclude": [
    "node_modules"
  ]
}
```

- Let's configure .babelrc file

_./babelrc_

```
{
  "presets": [
    "env",
    "preact"
  ],
  "plugins": [
    ["transform-react-jsx", { "pragma":"preact.h" }]
  ]  
}
```

- Let's create an HTML index container.

_./src/index.html_

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Webpack 3.x by sample</title>
  </head>
  <body>
  </body>
</html>
```

- A hello component

_./src/hello.tsx_

```javascript
import { h, Component } from 'preact';

export const Hello =  () => <h1>Hello</h1>
```

- Let's create main entry point.

_./src/main.tsx_

```javascript
import { h, render } from 'preact';
import {Hello} from './hello';

console.log(Hello);

render((
    <div>
        <h1>Is it working, shold display 'Hello' ?</h1>
        <Hello/>
    </div>
), document.body);
``` 


- Let's add webpack configuration we are going to use ES6 sintax for this

_./src/webpack.config.babel.js_

```javascript
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const basePath = __dirname;

export default {
  context: path.join(basePath, 'src'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js',]
  },

  entry: {
    app: './main.tsx',
    vendor: [
      'preact'
    ],
  },
  output: {
    path: path.join(basePath, 'dist'),
    filename: '[chunkhash].[name].js',
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
          },
          {
            loader: 'sass-loader',
          },
        ],
      }, {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
    ],
  },
  // For development https://webpack.js.org/configuration/devtool/#for-development
  devtool: 'inline-source-map',
  devServer: {
    port: 8080,
  },
  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin

    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html', //Name of template in ./src
      hash: true,
    }),
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  ],
};
```

- Let's add some commands to our package.json

```diff
  "scripts": {
+    "start": "webpack-dev-server --mode development",
+    "build": "rimraf dist && webpack --mode development",
+    "build:prod": "rimraf dist && webpack --mode production",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

- Time to try the application

```bash
npm start
```