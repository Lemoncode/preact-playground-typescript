# Adding CSS styling to our component

In this sample we will add isolated CSS styling to our component.

# Prerequisites

Ensure you have installed nodejs at least version 8.1.1.


# Steps

- We will take as starting point sample _01 css_

- Ensure you have installed the needed depencies from that sample:

```bash
npm install
```

- Let's update our webpack config to allow css modules.

_./webpack.config.babel.js_

```diff
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
+          options: {
+            modules: true,
+            localIdentName: '[name]__[local]___[hash:base64:5]',
+            camelCase: true
+          }
        },
        {
          loader: 'sass-loader',
        },
      ],
    }, 
```

- Let's create right under _src_ folder a _hello.scss_ file (this file will be handled
in webpack config using CSS Modules approach).

_./src/hello.styles.scss_

```css
.font-color {
  color: red;
}
```
- Let's update our component, import the brand new created css file and use it.

```diff
import { h, Component, render } from 'preact';
+ const styles = require('./hello.styles.scss');


- const Hello =  () => <h1>Hello</h1>
+ const Hello =  () => <h1 className={styles.fontColor}>Hello</h1>


export const instantiateHello = (domElement : HTMLElement) => {
  render((
    <Hello/>
  ), domElement);
}
```

> We are using SASS (.scss) we can use variables, mixins...

- Let's update our gallery inbdex html page to import the neede styles:

_./gallery/index.html_

```diff
<head>
  <meta charset="UTF-8">
  <title>Gallery</title>
+  <link rel="stylesheet" type="text/css" href="../build/dist/app.css">
</head>

<body>
  <h1>Gallery sample</h1>
```

- Now if we run the gallery we can see the hello message displayed
using a red font color (and if we open the developer tools we can
check that this css is prefixed to avoid collisions with other third
partie libraries styles).

```bash
npm run gallery
```

