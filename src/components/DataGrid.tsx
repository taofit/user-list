import React from 'react';
import { User } from './List';
import { Link } from 'react-router-dom';

const GITHUBPATH = './svg/github_icon.svg';
const LINKEDINPATH = './svg/linkedin_icon.svg';
const TWITTERPATH = './svg/twitter_icon.svg';
const USERAVATAR = './svg/user_avata_icon.svg';

const LINKEDIN = 'http://linkedin.com';
const TWITTER = 'https://twitter.com/';
const GITHUB = 'https://github.com/';

interface DataGridProps {
    user: User;
    lastUser: User | null;
    nextUser: User | null;
}

const DataGrid: React.FC<DataGridProps> = ({user, lastUser, nextUser}: DataGridProps) => {
    const userName = user.name.replace(' ', '-');
    const userAvatar = user.imagePortraitUrl ?? USERAVATAR;

    return <li className="user-profile">
            <Link
                to={{
                    pathname: `user/${userName}`,
                }}
                state={{
                    user,
                    lastUser,
                    nextUser
                }}
            >
                <img src={userAvatar} />
            </Link>
            <span className="caption">
                <span>{user.name}</span>
                <span>Office: {user.office}</span>
            </span>
            <span className="sm_icon">
                {user.linkedIn && <a href={`${LINKEDIN}${user.linkedIn}`}>
                    <img src={LINKEDINPATH} />
                </a>}
                {user.gitHub && <a href={`${GITHUB}${user.gitHub}`}>
                    <img src={GITHUBPATH} />
                </a>}
                {user.twitter && <a href={`${TWITTER}${user.twitter}`}>
                    <img src={TWITTERPATH} />
                </a>}
            </span>
        </li>;
}

export default DataGrid;