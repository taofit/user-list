import React from 'react';
import { User } from './List';
import { Link } from 'react-router-dom';

interface DataGridProps {
    user: User;
}

const linked = 'http://linkedin.com';
const twitter = 'https://twitter.com/';
const github = 'https://github.com/';

const DataGrid: React.FC<DataGridProps> = ({user}: DataGridProps) => {
    const userName = user.name.replace(' ', '-');

    return <li className="user-profile">
            <Link
                to={{
                    pathname: `user/${userName}`,
                }}
                state={{
                    user
                }}
            >
                <img src={user.imagePortraitUrl} />
            </Link>
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
        </li>;
}

export default DataGrid;