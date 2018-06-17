import { h, Component, render } from 'preact';

const Hello =  () => <h1>Hello</h1>

export const instantiateHello = (domElement : HTMLElement) => {
  render((
    <Hello/>
  ), domElement);
}
