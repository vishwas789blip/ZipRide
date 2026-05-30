import React from 'react';
import {
  Phone,
  Shield,
  Share2,
  MessageCircle,
  Star,
  MapPin,
} from 'lucide-react';

export default function DriverFoundPanel({
  pickup,
  onStartRide,
}) {
  const driver = {
    name: 'Rahul Sharma',
    rating: 4.9,
    vehicleNumber: 'UP14 AB 2345',
    vehicleModel: 'ZipGo',
    photo: '👨',
    vehicle: '🚗',
  };

  return (
    <div className="bg-white rounded-t-3xl p-5 shadow-2xl">

      {/* Driver Header */}
      <div className="flex items-center justify-between mb-5">

        <div className="flex items-center gap-3">

          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-4xl">
            {driver.photo}
          </div>

          <div className="text-5xl">
            {driver.vehicle}
          </div>

        </div>

        <div className="text-right">

          <p className="text-xs text-gray-500">
            DRIVER
          </p>

          <h2 className="text-3xl font-bold">
            {driver.vehicleNumber}
          </h2>

          <p className="text-gray-600">
            {driver.vehicleModel}
          </p>

          <div className="flex items-center justify-end gap-1 mt-1">
            <Star
              size={16}
              fill="currentColor"
              className="text-yellow-500"
            />
            <span className="font-semibold">
              {driver.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Message Box */}
      <div className="bg-gray-100 rounded-2xl p-4 flex items-center justify-between mb-6 cursor-pointer hover:bg-gray-200 transition">

        <span className="text-gray-500">
          Send a message...
        </span>

        <MessageCircle size={22} />
      </div>

      {/* Actions */}
      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="flex flex-col items-center">
          <button className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <Shield className="text-[#d5622d]" />
          </button>

          <span className="text-sm mt-2 text-center">
            Safety
          </span>
        </div>

        <div className="flex flex-col items-center">
          <button className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <Share2 className="text-[#d5622d]" />
          </button>

          <span className="text-sm mt-2 text-center">
            Share Trip
          </span>
        </div>

        <div className="flex flex-col items-center">
          <button className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <Phone className="text-[#d5622d]" />
          </button>

          <span className="text-sm mt-2 text-center">
            Call Driver
          </span>
        </div>

      </div>

      {/* Pickup Address */}
      <div className="border-t pt-4">

        <div className="flex gap-3">
          <MapPin className="text-[#d5622d]" />
          <div>
            <p className="font-bold text-xl">
              {pickup}
            </p>
            <p className="text-gray-500 text-sm">
              Pickup Location
           </p>
          </div>
        </div>
      </div>

      {/* Ride Button */}
      <button
        onClick={onStartRide}
        className="w-full mt-6 bg-[#d5622d] hover:bg-[#c75522] text-white py-4 rounded-2xl font-semibold transition"
      >
        Start Ride
      </button>

    </div>
  );
}