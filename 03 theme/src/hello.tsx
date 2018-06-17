import { h, Component, render } from 'preact';
const styles = require('./hello.styles.scss');

interface ThemeProps {
  hello?: string;
}

interface Props {
  theme?: ThemeProps;
}


const Hello =  (props : Props) => <h1 className={`${styles.fontColor} ${props.theme.hello}`}>Hello</h1>

export const instantiateHello = (domElement : HTMLElement, theme : ThemeProps = {}) => {
  render((
    <Hello theme={theme}/>
  ), domElement);
}
