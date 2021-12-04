import {useEffect, useState} from "react";
import {User} from "./List";

const InfiniteScroll = (
    users: User[],
    setFetchedAndFilteredUsers: (users: User[]) => void,
    setFetchedUsers: (users: User[]) => void,
    setIsFetching: (fetching: boolean) => void,
    isFetching: boolean
) => {
    const pageSize = 30;
    const startIndex = 0;
    const [endIndex, setEndIndex] = useState(startIndex + pageSize);

    const fetchUsers = () => {
        const currentUsers = users.slice(startIndex, endIndex);
        setEndIndex(endIndex + pageSize);
        setFetchedUsers(currentUsers);
        setFetchedAndFilteredUsers(currentUsers);
    };

    const handleScroll = () => {
        if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) < document.documentElement.offsetHeight
            || isFetching) {
            return;
        }
        setIsFetching(true);
    };

    useEffect(() => {
        if (isFetching) {
            fetchUsers();
            setIsFetching(false);
        }
    }, [isFetching]);

    useEffect(() => {
        if (!!users.length) {
            fetchUsers();
            window.addEventListener('scroll', handleScroll);
        }
    }, [users]);
};

export default InfiniteScroll;