import React from 'react';
import { useLocation } from 'react-router-dom';
import { User } from './List';

const htmlToText = (html: string) => {
    // remove code brakes and tabs
    html = html.replace(/\n/g, "");
    html = html.replace(/\t/g, "");

    //keep html brakes and tabs
    html = html.replace(/<\/td>/g, "\t");
    html = html.replace(/<\/table>/g, "\n");
    html = html.replace(/<\/tr>/g, "\n");
    html = html.replace(/<\/p>/g, "\n\n");
    html = html.replace(/<\/div>/g, "\n");
    html = html.replace(/<\/h>/g, "\n");
    html = html.replace(/<br>/g, "\n");
    html = html.replace(/<br( )*\/>/g, "\n");

    const dom = (new DOMParser()).parseFromString('<!doctype html><body>' + html, 'text/html');

    return dom.body.textContent;
}

const UserProfile = () => {
    const location = useLocation();
    const user: User = location.state.user;

    return <div className="user-page">
        <h2>{user.name}</h2>
        <p>{user.office}</p>
        <div className="main-text">{htmlToText(user.mainText)}</div>
        <img src={user.imageWallOfLeetUrl} />
    </div>
};

export default UserProfile;