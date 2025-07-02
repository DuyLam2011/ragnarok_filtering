'use client';

import { useState, useEffect } from 'react';
import DataFilter from '@/components/DataFilter';
import { Item, Filter } from '@/types/api';
import Image from 'next/image';

interface ApiResponse {
  data: Item[];
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [filter, setFilter] = useState<Filter>({
    searchTerm: '',
    type: 'Card',
    location: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/cards', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const responseData: ApiResponse = await response.json();
        setItems(responseData.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesSearch = filter.searchTerm
      ? item.name.toLowerCase().includes(filter.searchTerm.toLowerCase())
      : true;
    
    const matchesLocation = filter.location
      ? item.location === filter.location
      : true;

    return matchesSearch && matchesLocation;
  });

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Ragnarok Cards</h1>
        
        <DataFilter filter={filter} onFilterChange={setFilter} />

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
            {error}
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <article key={item.item_id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded"
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold mb-2 text-black">{item.name}</h2>
                  <p className="text-sm text-gray-600 mb-2">{item.description_history}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {item.location}
                    </span>
                  </div>
                </div>
              </div>
              {item.mobs && item.mobs.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <h3 className="text-sm font-semibold mb-2 text-black">Dropped by:</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.mobs.map((mob) => (
                      <div key={mob.monster_id} className="flex items-center space-x-2">
                        <Image
                          src={mob.image}
                          alt={mob.name}
                          width={24}
                          height={24}
                          className="rounded"
                        />
                        <span className="text-sm text-black">
                          {mob.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>

        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No cards found matching your filters.
          </div>
        )}
      </div>
    </main>
  );
}
