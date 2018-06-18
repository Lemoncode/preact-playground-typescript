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
      <div>
        <h2> Members Page</h2>
        <table>
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
