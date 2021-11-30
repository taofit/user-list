import React, {ChangeEvent, useEffect, useState} from 'react';
import { LoadUsers } from "./API";
import DataGrid from './DataGrid';
import Filter from './Filter';
import Sort from './Sort';

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
    const [processedUsers, setProcessedUsers] = useState<User[]>([]);
    const [sortType, setSortType] = useState('');
    const [name, setName] = useState('');
    const [office, setOffice] = useState('');
    const title = 'Profile List';

    const filterName = (e: ChangeEvent<HTMLInputElement>) => {
        const searchNameString = e.target.value.toLowerCase();
        if (searchNameString !== '') {
            setProcessedUsers(users.filter((user) => user.name?.toLowerCase().includes(searchNameString)));
        } else {
            setProcessedUsers(users);
        }

        setName(searchNameString);
    };

    const filterOffice = (e: ChangeEvent<HTMLInputElement>) => {
        const searchOfficeString = e.target.value.toLowerCase();
        if (searchOfficeString !== '') {
            setProcessedUsers(users.filter((user) => user.office?.toLowerCase().includes(searchOfficeString)));
        } else {
            setProcessedUsers(users);
        }

        setOffice(searchOfficeString);
    };

    useEffect(() => {
        LoadUsers().then((data) => {
            setUsers(data);
            setProcessedUsers(data);
            console.log(data);
        });
    }, []);

    const compareObjects = (object1: User, object2: User, key: string) => {
        if (key !== 'name' && key !== 'office') return 0;
        const obj1 = object1[key].toUpperCase()
        const obj2 = object2[key].toUpperCase()

        if (obj1 < obj2) {
            return -1
        }
        if (obj1 > obj2) {
            return 1
        }
        return 0
    }
    const setType = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortType(e.target.value);
    };

    useEffect(() => {
        const sorted = [...users].sort((userA, userB) => compareObjects(userA, userB, sortType));
        setProcessedUsers(sorted);
    }, [sortType]);

    return <div>
        <h4>{title}</h4>
        <Filter filterName={filterName} filterOffice={filterOffice} name={name} office={office}/>
        <Sort setSortType={setType} />
        <ul className="container">
            {processedUsers.map((user, index) => <DataGrid user={user} key={index}/>)}
        </ul>
    </div>;
}

export default List;