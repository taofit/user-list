import React, {ChangeEvent} from 'react';

interface FilterProps {
    filterName: (e: ChangeEvent<HTMLInputElement>) => void;
    filterOffice: (e: ChangeEvent<HTMLInputElement>) => void;
    name: string;
    office: string;
}

const Filter:React.FC<FilterProps> = ({filterName, filterOffice, name, office}: FilterProps) => {
    const className = 'filter-input';

    return <div>
        <input
            type="search"
            value={name}
            onChange={filterName}
            placeholder="Search by name"
            name="name"
            className={className}
        />
        <input
            type="search"
            value={office}
            onChange={filterOffice}
            placeholder="Search by office"
            name="office"
            className={className}
        />
    </div>;
}

export default Filter;