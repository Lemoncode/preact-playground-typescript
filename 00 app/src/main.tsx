import { h, render } from 'preact';
import {Hello} from './hello';

console.log(Hello);

render((
    <div>
        <h1>Is it working should display 'Hello'?</h1>
        <Hello/>
    </div>
), document.body);
