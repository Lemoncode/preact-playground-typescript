# Simple lib

Let's create a very simple library project based on our first simple application project.

We will create a build out in differente flavours (ES6, ES5...), and avoid having external
dependencies (we will use low weight libraries like preact).

# Prerequisites

Ensure you have installed nodejs at least version 8.1.1.


# Steps

- We will take as starting point sample _00 simple app_

- Ensure you have installed the needed depencies from that sample:

```bash
npm install
```

- Let's remove the test _html_ page that we used in our previous app sample:

remove --> _./src/index.html_

- Let's remove _main.tsx_

remove --> _./src/main.tsx_

- Let's update _hello.tsx_ we will define an entry point for an application to
consume this component without knowing whether it is using preact or any other
technollogy.

```typescript
import { h, Component, render } from 'preact';

const Hello =  () => <h1>Hello</h1>

export const instantiateHello = (domElement : HTMLElement) => {
  render((
    <Hello/>
  ), domElement);
}
```

- Let's replace our _webpack.config.babel.js_ with a configuration that allows
making a build as library, including UMD + ES5.

_webpack.config.babel.js_

```javascript
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';

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
    app: './hello.tsx',
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
  // For development https://webpack.js.org/configuration/devtool/#for-development
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      disable: false,
      chunkFilename: true,
    }),
  ],
};
```

- Let's create a test runner (gallery section), in this page we will be able to 
test the components library build we have created (es5 version) without having to
install another component.

- First we will create an _html_ file

_./gallery/index.html_

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Gallery</title>
</head>

<body>
  <h1>Gallery sample</h1>

  <div id="hello">

  </div>
</body>

<script src="../build/dist/simple-lib-1.0.0.js"></script>
<script src="./main.js"></script>

</html>
```

- Now a main js where we will instantiate our library component (hello component).

_./gallery/main.js_

```typescript
window['SimpleLib'].instantiateHello(document.getElementById('hello'));
```

- We are almost there we have to update our package.json commands, to allow
making a library build, and execute our gallery test runner.

_./package.json_

```diff
  "scripts": {
-    "start": "webpack-dev-server --mode development",
-    "build": "rimraf dist && webpack --mode development",
-    "build:prod": "rimraf dist && webpack --mode production",
-    "test": "echo \"Error: no test specified\" && exit 1"
+    "clean": "rimraf build",
+    "prepublish": "npm run clean && npm run build",
+    "build": "npm run clean && npm run build:commonjs && npm run build:umd && npm run build:umd:min && npm run build:es",
+    "build:commonjs": "cross-env BABEL_ENV=commonjs babel src --out-dir build/lib --copy-files --ignore spec.js,test.js",
+    "build:es": "cross-env BABEL_ENV=es babel src --out-dir build/es --copy-files --ignore spec.js,test.js",
+    "build:umd": "cross-env BABEL_ENV=commonjs NODE_ENV=development webpack --mode=development",
+    "build:umd:min": "cross-env BABEL_ENV=commonjs NODE_ENV=production webpack --mode=production",
+    "gallery": "npm run prepublish && webpack-dev-server --mode=development --openPage '/gallery'"
  },
```

> As an excercise you could build a _gallery-lite_ command that only makes the UMD build
faster performance.

- Let's give a try making a build

```bash
npm run build
```

- Le'ts run the gallery

```bash
npm run gallery
```


