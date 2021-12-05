import React, {ChangeEvent, useEffect, useState} from 'react';
import LoadUsers from './API';
import Filter from './Filter';
import Sort from './Sort';
import InfiniteScroll from './InfiniteScroll';
import { CompareObjects } from '../helpers/helper';
import UserList from './UserList';

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

const Main = () => {
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [fetchedUsers, setFetchedUsers] = useState<User[]>([]);
    const [fetchedAndFilteredUsers, setFetchedAndFilteredUsers] = useState<User[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [endOfPage, setEndOfPage] = useState(false);
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

    const ViewMode: React.FC = () => (
        <div>
            View by:
            <button onClick={() => setLayoutClassName(GRID)} className={layoutClassName === GRID ? 'highlight' : ''}>Grid</button>
            <button onClick={() => setLayoutClassName(FLEX)} className={layoutClassName === FLEX ? 'highlight' : ''}>Flex</button>
        </div>
    )

    const DisplayMsg:React.FC = () => {
        const msg = [];
        if (!fetchedAndFilteredUsers.length && isLoading) {
            msg.push('Loading...');
        }
        if (!fetchedAndFilteredUsers.length && !isLoading) {
            msg.push('No result');
        }
        if (isFetching && !endOfPage) {
            msg.push('Fetching more users...');
        }

        return <div>{msg.map((item,index) => <h3 key={index}>{item}</h3>)}</div>;
    };

    InfiniteScroll(allUsers, fetchedUsers, setFetchedAndFilteredUsers, setFetchedUsers, setIsFetching, isFetching, setIsLoading, setEndOfPage);

    useEffect(() => {
        const sorted = [...fetchedUsers].sort((userA, userB) => CompareObjects(userA, userB, sortType));
        setFetchedAndFilteredUsers(sorted);
    }, [sortType]);

    useEffect(() => {
        // set a clean up flag
        let isSubscribed = true;
        LoadUsers().then((data) => {
            setAllUsers(data);
            // console.log(data);
        });
        return () => {isSubscribed = false};
    }, []);

    return (
        <div>
            <h4>{title}</h4>
            <ViewMode/>
            <Filter filterName={filterName} filterOffice={filterOffice} name={name} office={office} />
            <Sort setSortType={setSortType} />
            <UserList fetchedAndFilteredUsers={fetchedAndFilteredUsers} layoutClassName={layoutClassName} />
            <DisplayMsg />
        </div>
    );
}

export default Main;