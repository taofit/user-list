import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import { User } from './Main';
import { HtmlToText } from '../helpers/helper';

interface NeighbourUserProps {
    user: User;
    className: string
}

const getFullUserName = (name: string): string => name.replace(' ', '-');
const NeighbourUser: React.FC<NeighbourUserProps> = ({user, className}: NeighbourUserProps) => <Link
    className={className}
    to={{
        pathname: `/user/${getFullUserName(user.name)}`
    }}
    state={{
        user,
    }}
>
    {user.name}
    <img src={user.imagePortraitUrl} style={{width: '20px'}}/>
</Link>;

const UserProfile: React.FC = () => {
    const location = useLocation();
    const user: User = location.state.user;
    const lastUser: User = location.state.lastUser;
    const nextUser: User = location.state.nextUser;

    return <div className="user-page">
        <Link
            to={{
                pathname: '/',
            }}
        >
            Home
        </Link>
        <h2>{user.name}</h2>
        <p>{user.office}</p>
        <div className="main-text">
            {HtmlToText(user.mainText).map((paragraph, index) => (<p key={index}>
                {paragraph}
            </p>))}
        </div>
        <img src={user.imageWallOfLeetUrl} />
        <br/>
        {lastUser && <NeighbourUser user={lastUser} className='last-user'/>}
        {nextUser && <NeighbourUser user={nextUser} className='next-user' />}
    </div>
};

export default UserProfile;