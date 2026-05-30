import React from "react";

const CaptainRidePopUp = ({ ride, onConfirm, onIgnore }) => {
  const {
    riderName = "Harsh Patel",
    distance = "2.2 KM",
    pickup = {
      address: "562/11-A",
      area: "Kankariya Talab, Bhopal",
    },
    dropoff = {
      address: "742/4-B",
      area: "MP Nagar, Bhopal",
    },
    fare = "₹193.20",
    paymentMode = "Cash",
  } = ride || {};

  const initials = riderName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white rounded-t-3xl p-5 shadow-2xl w-full">
      {/* Drag Handle */}
      <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-5"></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900">
          🚕 New Ride Available
        </h2>

        <span className="text-sm font-semibold bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
          {distance}
        </span>
      </div>

      {/* Rider */}
      <div className="bg-yellow-400 rounded-2xl p-4 flex items-center gap-3 mb-5">
        <div className="h-12 w-12 rounded-full bg-yellow-700 text-white flex items-center justify-center font-bold">
          {initials}
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">
            {riderName}
          </h3>

          <p className="text-sm text-gray-700">
            Nearby Passenger
          </p>
        </div>

        <span className="font-bold text-gray-900">
          {distance}
        </span>
      </div>

      {/* Ride Details */}
      <div className="bg-gray-50 rounded-2xl overflow-hidden border mb-5">

        {/* Pickup */}
        <div className="flex gap-4 p-4">
          <div className="text-green-600 text-lg">📍</div>

          <div>
            <h4 className="font-medium text-gray-900">
              {pickup.address}
            </h4>

            <p className="text-sm text-gray-500">
              {pickup.area}
            </p>
          </div>
        </div>

        <hr />

        {/* Drop */}
        <div className="flex gap-4 p-4">
          <div className="text-red-500 text-lg">🏁</div>

          <div>
            <h4 className="font-medium text-gray-900">
              {dropoff.address}
            </h4>

            <p className="text-sm text-gray-500">
              {dropoff.area}
            </p>
          </div>
        </div>

        <hr />

        {/* Fare */}
        <div className="flex gap-4 p-4">
          <div className="text-green-600 text-lg">💰</div>

          <div>
            <h4 className="font-bold text-lg text-gray-900">
              {fare}
            </h4>

            <p className="text-sm text-gray-500">
              {paymentMode}
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-3">
        <button
          onClick={onConfirm}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
        >
          ✅ Accept Ride
        </button>

        <button
          onClick={onIgnore}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold transition"
        >
          ❌ Ignore
        </button>
      </div>
    </div>
  );
};

export default CaptainRidePopUp;