import { useState } from 'react';

const vehicles = [
  { id: 'go',   emoji: '🚗', name: 'ZipGo',   seats: 4, eta: '2 mins away', desc: 'Affordable, compact rides',    price: 193.20 },
  { id: 'moto', emoji: '🏍️', name: 'Moto',     seats: 1, eta: '3 mins away', desc: 'Affordable motorcycle rides', price: 65 },
  { id: 'auto', emoji: '🛺', name: 'ZipAuto',  seats: 3, eta: '3 mins away', desc: 'Affordable auto rides',       price: 118.86 },
];

const ChooseVehiclePanel = ({ onConfirm }) => {
  const [selected, setSelected] = useState(null);

  const selectedVehicle = vehicles.find(v => v.id === selected);

  return (
    <div className='bg-white rounded-t-3xl px-5 pt-5 pb-6'>

      <h2 className='text-xl font-medium mb-4'>Choose a vehicle</h2>

      <div className='flex flex-col gap-3'>
        {vehicles.map(v => (
          <div
            key={v.id}
            onClick={() => setSelected(v.id)}
            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all
              ${selected === v.id
                ? 'border-black bg-gray-50'
                : 'border-gray-200 bg-white'
              }`}
          >
            <span className='text-4xl w-14 text-center'>{v.emoji}</span>

            <div className='flex-1'>
              <div className='flex items-center gap-2'>
                <span className='font-medium text-sm'>{v.name}</span>
                <span className='text-gray-500 text-xs'>👤{v.seats}</span>
              </div>
              <p className='text-gray-500 text-xs mt-0.5'>{v.eta}</p>
              <p className='text-gray-400 text-xs'>{v.desc}</p>
            </div>

            <span className='font-medium text-sm'>
              ₹{v.price.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <button
        disabled={!selected}
        onClick={() => onConfirm?.(selectedVehicle)}
        className={`w-full mt-5 py-3.5 rounded-xl text-white font-medium text-base transition-all
          ${selected
            ? 'bg-black cursor-pointer'
            : 'bg-gray-300 cursor-not-allowed'
          }`}
      >
        {selected
          ? `Confirm ${selectedVehicle.name} · ₹${selectedVehicle.price.toFixed(2)}`
          : 'Confirm ride'
        }
      </button>

    </div>
  );
};

export default ChooseVehiclePanel;