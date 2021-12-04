import React, {ChangeEvent, useEffect, useState} from 'react';
import { LoadUsers } from "./API";
import DataGrid from './DataGrid';
import Filter from './Filter';
import Sort from './Sort';
import InfiniteScroll from './InfiniteScroll';

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

const GRID = 'container-grid';
const FLEX = 'container-flex';

const List = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [fetchedUsers, setFetchedUsers] = useState<User[]>([]);
    const [fetchedAndFilteredUsers, setFetchedAndFilteredUsers] = useState<User[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [sortType, setSortType] = useState('');
    const [name, setName] = useState('');
    const [office, setOffice] = useState('');
    const [layoutClassName, setLayoutClassName] = useState(GRID);
    const title = 'Profile List';

    const filterName = (e: ChangeEvent<HTMLInputElement>) => {
        const searchNameString = e.target.value.toLowerCase();
        if (searchNameString !== '') {
            setFetchedAndFilteredUsers(fetchedUsers.filter((user) => user.name?.toLowerCase().includes(searchNameString)));
        } else {
            setFetchedAndFilteredUsers(fetchedUsers);
        }

        setName(searchNameString);
    };

    const filterOffice = (e: ChangeEvent<HTMLInputElement>) => {
        const searchOfficeString = e.target.value.toLowerCase();
        if (searchOfficeString !== '') {
            setFetchedAndFilteredUsers(fetchedUsers.filter((user) => user.office?.toLowerCase().includes(searchOfficeString)));
        } else {
            setFetchedAndFilteredUsers(fetchedUsers);
        }

        setOffice(searchOfficeString);
    };

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

    const switchView = () => {
        setLayoutClassName(layoutClassName === GRID ? FLEX : GRID);
    };

    const ViewMode = () => (
        <div>
            View by:
            <button onClick={switchView} className={layoutClassName === GRID ? 'highlight' : ''}>Grid</button>
            <button onClick={switchView} className={layoutClassName === FLEX ? 'highlight' : ''}>Flex</button>
        </div>
    )

    InfiniteScroll(users, setFetchedAndFilteredUsers, setFetchedUsers, setIsFetching, isFetching);

    useEffect(() => {
        const sorted = [...fetchedUsers].sort((userA, userB) => compareObjects(userA, userB, sortType));
        setFetchedAndFilteredUsers(sorted);
    }, [sortType]);

    useEffect(() => {
        LoadUsers().then((data) => {
            setUsers(data);
            console.log(data);
        });
    }, []);

    return <div>
        <h4>{title}</h4>
        <ViewMode />
        <Filter filterName={filterName} filterOffice={filterOffice} name={name} office={office}/>
        <Sort setSortType={setSortType} />
        <ul className={layoutClassName}>
            {fetchedAndFilteredUsers.map((user, index) => <DataGrid user={user} key={index}/>)}
        </ul>
        {isFetching && <h1>Fetching more users...</h1>}
    </div>;
}

export default List;