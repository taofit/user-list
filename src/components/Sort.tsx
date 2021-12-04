import React from 'react';

interface SortProps {
    setSortType: (value: string) => void;
}

const sortTypes = ['name', 'office'];

const Sort: React.FC<SortProps> = ({setSortType}: SortProps) => {
    return (
        <div className="sort-by">
            <label>Sort by:</label>
            <select
                onChange={(e) => setSortType(e.target.value)}
            >
                {sortTypes.map((type, index) => <option key={index} value={type}>{type}</option>)}
            </select>
        </div>
    )
};

export default Sort;