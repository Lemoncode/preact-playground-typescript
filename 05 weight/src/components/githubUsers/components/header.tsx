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
