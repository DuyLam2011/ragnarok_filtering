'use client';

import { Filter } from '@/types/api';
import { ChangeEvent } from 'react';

interface DataFilterProps {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
}

const LOCATIONS = [
  'Armor',
  'Weapon',
  'Shield',
  'Head Low',
  'Shoes',
  'Acessório',
  'Vestiment',
];

export default function DataFilter({ filter, onFilterChange }: DataFilterProps) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filter,
      searchTerm: e.target.value,
    });
  };

  const handleLocationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filter,
      location: e.target.value || null,
    });
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div>
        <label htmlFor="search" className="block text-sm font-medium text-black">
          Search Cards
        </label>
        <input
          type="text"
          id="search"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Search by card name..."
          value={filter.searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-black">
          Filter by Equipment Location
        </label>
        <select
          id="location"
          className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={filter.location || ''}
          onChange={handleLocationChange}
        >
          <option value="" className='text-black'>All Locations</option>
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc} className='text-black'>
              {loc}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
