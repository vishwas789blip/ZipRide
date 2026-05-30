import React from "react";

const Navigation = ({ onBack, onDropOff, rideInfo }) => {
  const {
    pickupAddress = "7958 Swift Village",
    eta = "5 min",
    distance = "2.2 km",
    fare = "₹193",
    currentInstruction = "Turn right ahead",
    distanceToTurn = "250m",
  } = rideInfo || {};

  return (
    <div className="h-screen w-full flex flex-col bg-white">

      {/* Top Navigation */}
      <div className="bg-white shadow-sm px-4 py-3 flex items-center justify-between z-20">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl"
        >
          ←
        </button>

        <h2 className="font-semibold text-lg">
          🚕 Pick Up Rider
        </h2>

        <div className="w-10"></div>
      </div>

      {/* Navigation Banner */}
      <div className="bg-yellow-400 px-4 py-3 flex items-center gap-3">
        <div className="bg-black text-white text-xs px-3 py-1 rounded-full">
          {distanceToTurn}
        </div>

        <p className="font-medium text-sm">
          🧭 {currentInstruction}
        </p>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-gray-200">

        {/* Replace with Live Map */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-2">🗺️</div>
            <p className="text-gray-600">
              Live Navigation Map
            </p>
          </div>
        </div>

        {/* Floating ETA Card */}
        <div className="absolute top-5 right-4 bg-white shadow-lg rounded-2xl px-4 py-3">
          <h3 className="font-bold text-xl">
            {eta}
          </h3>
          <p className="text-xs text-gray-500">
            Arrival Time
          </p>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.15)] p-5">

        {/* Handle */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-5"></div>

        {/* Pickup Address */}
        <div className="flex items-start gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            📍
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Pick Up At
            </p>

            <h3 className="font-semibold text-gray-900">
              {pickupAddress}
            </h3>
          </div>
        </div>

        {/* Ride Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">

          <div className="bg-gray-100 rounded-xl p-3 text-center">
            <h3 className="font-bold text-lg">
              {eta}
            </h3>
            <p className="text-xs text-gray-500">
              ETA
            </p>
          </div>

          <div className="bg-gray-100 rounded-xl p-3 text-center">
            <h3 className="font-bold text-lg">
              {distance}
            </h3>
            <p className="text-xs text-gray-500">
              Distance
            </p>
          </div>

          <div className="bg-gray-100 rounded-xl p-3 text-center">
            <h3 className="font-bold text-lg">
              {fare}
            </h3>
            <p className="text-xs text-gray-500">
              Fare
            </p>
          </div>

        </div>

        {/* Action Button */}
        <button
          onClick={onDropOff}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold text-lg transition-all"
        >
          ✅ Arrived At Pickup
        </button>

      </div>
    </div>
  );
};

export default Navigation;