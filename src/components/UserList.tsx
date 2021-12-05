import React from 'react';
import {User} from "./Main";
import DataGrid from './DataGrid';

interface UserListType {
    fetchedAndFilteredUsers: User[];
    layoutClassName: string
}

const UserList: React.FC<UserListType> = ({fetchedAndFilteredUsers, layoutClassName}: UserListType) => (
    <ul className={layoutClassName}>
        {fetchedAndFilteredUsers.map((user, index, elements) => {
            const nextIndex = index < elements.length - 1 ? index + 1 : null;
            const lastIndex = index === 0 ? null : index - 1;

            const nextUser = nextIndex !== null ? elements[nextIndex] : null;
            const lastUser = lastIndex !== null ? elements[lastIndex] : null;

            return <DataGrid user={user} key={index} lastUser={lastUser} nextUser={nextUser}/>
        })}
    </ul>
);

export default UserList;