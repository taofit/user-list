import React, {ChangeEvent} from 'react';

interface SortProps {
    setSortType: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const sortTypes = ['name', 'office'];

const Sort: React.FC<SortProps> = ({setSortType}: SortProps) => {
    return (
        <select
            onChange={setSortType}
        >
            {sortTypes.map((type, index) => <option key={index} value={type}>{type}</option>)}
        </select>)
};

export default Sort;