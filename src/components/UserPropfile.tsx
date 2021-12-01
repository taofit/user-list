import React from 'react';
import { useLocation } from 'react-router-dom';
import { User } from './List';

const UserProfile = () => {
    const location = useLocation();
    const user: User = location.state.user;

    return <div className="user-page">
        <h2>{user.name}</h2>
        <p>{user.office}</p>
        <div className="main-text">{user.mainText}</div>
        <img src={user.imageWallOfLeetUrl} />
    </div>
};

export default UserProfile;