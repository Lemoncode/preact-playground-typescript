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
