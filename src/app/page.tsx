'use client';

import Link from 'next/link';

export default function Home() {
  const routes = [
    {
      path: '/card',
      title: 'Card Database',
      description: 'Browse and filter Ragnarok Online cards, view stats, and find drop locations.',
      icon: '🎴',
    },
    // Add more routes here in the future
  ];

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-black">Ragnarok Tools</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          {routes.map((route) => (
            <Link 
              key={route.path} 
              href={route.path}
              className="text-black block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <span className="text-4xl">{route.icon}</span>
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-black">{route.title}</h2>
                  <p className="text-gray-600">{route.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
