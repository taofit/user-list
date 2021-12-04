import React, {ChangeEvent, useEffect, useState} from 'react';
import LoadUsers from './API';
import DataGrid from './DataGrid';
import Filter from './Filter';
import Sort from './Sort';
import InfiniteScroll from './InfiniteScroll';
import { CompareObjects } from '../helpers/helper';

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
    const [allUsers, setAllUsers] = useState<User[]>([]);
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

    const ViewMode: React.FC = () => (
        <div>
            View by:
            <button onClick={() => setLayoutClassName(GRID)} className={layoutClassName === GRID ? 'highlight' : ''}>Grid</button>
            <button onClick={() => setLayoutClassName(FLEX)} className={layoutClassName === FLEX ? 'highlight' : ''}>Flex</button>
        </div>
    )

    InfiniteScroll(allUsers, setFetchedAndFilteredUsers, setFetchedUsers, setIsFetching, isFetching);

    useEffect(() => {
        const sorted = [...fetchedUsers].sort((userA, userB) => CompareObjects(userA, userB, sortType));
        setFetchedAndFilteredUsers(sorted);
    }, [sortType]);

    useEffect(() => {
        // set a clean up flag
        let isSubscribed = true;
        LoadUsers().then((data) => {
            setAllUsers(data);
        });
        return () => {isSubscribed = false};
    }, []);

    return <div>
        <h4>{title}</h4>
        <ViewMode />
        <Filter filterName={filterName} filterOffice={filterOffice} name={name} office={office}/>
        <Sort setSortType={setSortType} />
        <ul className={layoutClassName}>
            {fetchedAndFilteredUsers.map((user, index, elements) => {
                const nextIndex = index < elements.length - 1 ? index + 1 : null;
                const lastIndex = index === 0 ? null : index - 1;

                const nextUser = nextIndex !== null ? elements[nextIndex] : null;
                const lastUser = lastIndex !== null ? elements[lastIndex] : null;
                return <DataGrid user={user} key={index} lastUser={lastUser} nextUser={nextUser}/>
            })}
        </ul>
        {isFetching && <h3>Fetching more users...</h3>}
    </div>;
}

export default List;