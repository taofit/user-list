import React from 'react';
import { User } from './list';

interface DataGridProps {
    user: User;
}

const linked = 'http://linkedin.com';
const twitter = 'https://twitter.com/';
const github = 'https://github.com/';

const DataGrid: React.FC<DataGridProps> = ({user}: DataGridProps) => (
    <li className="user-profile">
        <a href=''>
            <img src={user.imagePortraitUrl} />
        </a>
        <span>
            <span>{user.name}</span>
            {user.linkedIn && <a href={`${linked}${user.linkedIn}`}>
                linkedIn
            </a>}
            {user.gitHub && <a href={`${github}${user.gitHub}`}>
                github
            </a>}
            {user.twitter && <a href={`${twitter}${user.twitter}`}>
                twitter
            </a>}
        </span>
        <span>Office: {user.office}</span>
    </li>);

export default DataGrid;