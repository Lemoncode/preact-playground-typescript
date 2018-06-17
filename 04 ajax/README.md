# Executing AJAX Calls

It's time to make some call to a given rest api, we don't have to forget that 
we are targeting ES5 and we want to keep the library slim (lightweight).

Using fetch and adding the given promises + fetch polyfill could add too much weight,
we have use a small fetch library made by the creator of preact but it had some 
issues with CORS.

We have decided to use _superagent_ library, it's lightweight and popular.

# Prerequisites

Ensure you have installed nodejs at least version 8.1.1.


# Steps

- We will take as starting point sample _03 theme_

- Ensure you have installed the needed depencies from that sample:

```bash
npm install
```

- We will start by refactoring our project structure to hold in a more 
maintanable way our components.

- Let's create a components subfolder and move the hello component
to the following route, plus renaming the associated css file:

_./src/components/hello/index.tsx_

```javascript
import { h, Component, render } from 'preact';
const styles = require('./styles.scss');

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
```

_./src/components/hello/styles.scss_

```css
.font-color {
  color: red;
}
```

- Let's define an index file under src where we will export our hello components
(and more to come)

_./src/index.ts_

```javascript
export {instantiateHello} from './components/hello';
```

- Let's update our webpack.config entry point.

_./webpack.config.babel.js_

```diff
  entry: {
-    app: './hello.tsx',
+    app: './index.ts',
  },
```

> Do not forget to remove the _./src/hello.tsx_ and move _hello.styles.scss_ to the
new _components/hello_ subfolder.

- We will load a list of users from the Github rest api.

- Let's install _superagent_

```bash
npm install superagent --save
```

- Let's install _superagent_ typescript definitions.

```bash
npm install @types/superagent --save-dev
```

- Let's define a model:

_./src/components/githubUsers/model/member.ts_

```javascript
export interface MemberEntity {
  id: number;
  login: string;
  avatar_url: string;
}
```

- Let's implement our api call:

_./src/components/githubUsers/api/member.ts_

```javascript
import * as request from 'superagent'

export const fetchGithubMemberList = (callback) => {
  request.get('https://api.github.com/orgs/lemoncode/members')
    .end(callback);
}
```

- Let's create a github member list component:

- First we will define a header.

_./src/components/githubUsers/components/header.tsx_

```javascript
import { h, Component, render } from 'preact';
import { MemberEntity } from '../model/member';

export const MemberHeader = () =>
    <tr>
        <th>
            Avatar
        </th>
        <th>
            Id
        </th>
        <th>
            Name
        </th>
    </tr>
```

- Then define a body.

_./src/components/githubUsers/components/row.tsx_

```javascript
import { h, Component, render } from 'preact';
import { MemberEntity } from '../model/member';

interface Props {
  member: MemberEntity;
}

export const MemberRow = (props: Props) =>
  <tr>
    <td>
      <img src={props.member.avatar_url} style={{ maxWidth: '10rem' }} />
    </td>
    <td>
      <span>{props.member.id}</span>
    </td>
    <td>
      <span>{props.member.login}</span>
    </td>
  </tr>
```

- Then the component itself.

_./src/components/githubUsers/index.tsx_

```javascript
import { h, Component, render } from 'preact';
import {fetchGithubMemberList} from './api/member';
import {MemberHeader} from './components/header';
import {MemberRow} from './components/row';
import { MemberEntity } from './model/member';

interface ThemeProps {
  hello?: string;
}

interface Props {
  theme?: ThemeProps;
}

interface State {
  memberList: Array<MemberEntity>
}

export class MembersTableComponent extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    // set initial state
    this.state = { memberList: [] };
  }

  public componentDidMount() {
    fetchGithubMemberList(
      (err, res) => {
        this.setState({ memberList: res.body })  
      }
    );
  }

  public render() {

    return (
      <div className="row">
        <h2> Members Page</h2>
        <table className="table">
          <thead>
              <MemberHeader />
          </thead>
          <tbody>
            {
              this.state.memberList.map((member: MemberEntity) =>
                <MemberRow member={member} />
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export const instantiateGithubMemberList = (domElement : HTMLElement, theme : ThemeProps = {}) => {
  render((
    <MembersTableComponent theme={theme}/>
  ), domElement);
}
```


- Let's update the _./src/index.ts_ file to include our new Github List component.

```diff
export {instantiateHello} from './components/hello';
+ export {instantiateGithubMemberList} from './components/githubUsers';
```
- Let's update our gallery


_./gallery/index.html_

```diff
<body>
  <h1>Gallery sample</h1>

  <div id="hello">
  </div>

+  <div id="githublist">
+  </div>
</body>
```

- And in the gallery main javascript file let's instantiate the github component.

_./galleryt/main.js_

```diff
- const myThemeProps = {
+  const helloThemeProps = {
  hello: 'my-hello-styles'
}

window['SimpleLib'].instantiateHello(
  document.getElementById('hello'),
-  myThemeProps
+  helloThemeProps
);

+ window['SimpleLib'].instantiateGithubMemberList(
+   document.getElementById('githublist'),
+   myThemeProps
+ );
```

- Time to give a try:

```bash
npm run gallery
```

 

