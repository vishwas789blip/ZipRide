import React from 'react';

const locations = [
  { id: 'home', name: 'Home', address: '123 Main St, Cityville' },
  { id: 'work', name: 'Work', address: '456 Office Rd, Metropolis' },
  { id: 'gym', name: 'Gym', address: '789 Fitness Ave, Townsville' },
];

function LocationSearchPanel({ onSelect }) {
  return (
    <div>
      {locations.map((loc) => (
        <button
          key={loc.id}
          type="button"
          onClick={() => onSelect?.(loc.name)}
          className="flex items-center gap-3 mb-4 w-full text-left p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            {loc.name.charAt(0)}
          </div>

          <div>
            <div className="font-medium">{loc.name}</div>
            <div className="text-sm text-gray-500">
              {loc.address}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default LocationSearchPanel;