# Adding custom theming capabilities to our components

In this sample we will add custom theming capabalities extension to 
our component.

# Prerequisites

Ensure you have installed nodejs at least version 8.1.1.


# Steps

- We will take as starting point sample _02 css_

- Ensure you have installed the needed depencies from that sample:

```bash
npm install
```

- Let's update hello.tsx and expose an entry point to allow an application consuming
our component to be able to customize it's css.

_./src/hello.tsx_

```diff
import { h, Component, render } from 'preact';
const styles = require('./hello.styles.scss');

+ interface ThemeProps {
+  hello?: string;
+ }

+ interface Props {
+  theme?: ThemeProps;
+ }

- const Hello =  () => <h1 className={styles.fontColor}>Hello</h1>
+ const Hello =  (props : Props) => <h1 className={`${styles.fontColor} ${props.theme.hello}`}>Hello</h1>


- export const instantiateHello = (domElement : HTMLElement) => {
+  export const instantiateHello = (domElement : HTMLElement, theme : ThemeProps = {}) => {
  render((
-    <Hello/>
+    <Hello theme={theme}/>
  ), domElement);
}
```

- By doing this we can now update our gallery sample and play with some custom styling
(we will update the font color of the hello component from red to blue).

- Let's create some custom CSS

_./gallery/mycss.css_

```css
.my-hello-styles {color: blue}
```

- Let's import this in our gallery index page.

_./gallery/index.html_

```diff
<head>
  <meta charset="UTF-8">
  <title>Gallery</title>
  <link rel="stylesheet" type="text/css" href="../build/dist/app.css">
+   <link rel="stylesheet" type="text/css" href="./mycss.css">
</head>

```

- Let's update  main

_./gallery/main.js_

```diff
+ const myThemeProps = {
+  hello: 'my-hello-styles'
+ }

- window['SimpleLib'].instantiateHello(document.getElementById('hello'));
+ window['SimpleLib'].instantiateHello(
+                        document.getElementById('hello'),
+                        myThemeProps
+                    );
```

- Let's run the sample

```bash
npm run gallery
```