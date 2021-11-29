import React, { useEffect, useState } from 'react';
import { LoadUsers } from "./API";
import DataGrid from './DataGrid';

export interface User {
    name: string;
    email: string;
    gitHub: string | null;
    highlighted: boolean;
    imagePortraitUrl: string;
    imageWallOfLeetUrl: string;
    linkedIn: string | null;
    mainText: string;
    manager: string;
    office: string;
    orgUnit: string
    phoneNumber: string
    published: boolean
    stackOverflow: string | null
    twitter: string | null
}

const List = () => {
    const [users, setUsers] = useState<User[]>([]);
    const title = 'Profile List';
    useEffect(() => {
        LoadUsers().then((data) => {
            setUsers(data);
            console.log(users, data);
        });
    }, []);

    return <div>
        <h4>{title}</h4>
        <ul className="container">
            {users.map((user, index) => <DataGrid user={user} key={index}/>)}
        </ul>
    </div>;
}

export default List;