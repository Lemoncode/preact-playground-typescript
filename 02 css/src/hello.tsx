import { h, Component, render } from 'preact';
const styles = require('./hello.styles.scss');

const Hello =  () => <h1 className={styles.fontColor}>Hello</h1>

export const instantiateHello = (domElement : HTMLElement) => {
  render((
    <Hello/>
  ), domElement);
}
