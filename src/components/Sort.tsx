import React, {ChangeEvent} from 'react';

interface SortProps {
    setSortType: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const sortTypes = ['name', 'office'];

const Sort: React.FC<SortProps> = ({setSortType}: SortProps) => {
    return (
        <div className="sort-by">
            <label>Sort by:</label>
            <select
                onChange={setSortType}
            >
                {sortTypes.map((type, index) => <option key={index} value={type}>{type}</option>)}
            </select>
        </div>
    )
};

export default Sort;