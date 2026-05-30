import React from "react";

const TURN_ICONS = {
  straight: "⬆️",
  left: "↰",
  right: "↱",
  "slight-right": "↗️",
  keep: "⬆️",
};

const TurnByTurn = ({
  onBack,
  onDropOff,
  rideInfo,
  directions,
}) => {
  const {
    pickupAddress = "7958 Swift Village",
    eta = "5 min",
    distance = "2.2 km",
    fare = "₹193",
    currentInstruction = "Turn right ahead",
    distanceToTurn = "250m",
  } = rideInfo || {};

  const defaultDirections = [
    {
      type: "straight",
      text: "Head southwest on Madison St",
      dist: "18 mi",
    },
    {
      type: "left",
      text: "Turn left onto 4th Ave",
      dist: "12 mi",
    },
    {
      type: "right",
      text: "Turn right at 105 N Link Rd",
      subtext: "Pass by Executive Hotel Pacific",
      dist: "250 m",
      highlight: true,
    },
    {
      type: "keep",
      text: "Keep left for Airport",
      dist: "8 mi",
    },
  ];

  const steps = directions || defaultDirections;

  return (
    <div className="h-screen flex flex-col bg-gray-100">

      {/* Top Navbar */}
      <div className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl"
        >
          ←
        </button>

        <h2 className="font-bold text-lg">
          🚕 Navigation
        </h2>

        <div className="w-10" />
      </div>

      {/* Current Instruction */}
      <div className="bg-yellow-400 p-4 flex items-center gap-3">
        <div className="bg-black text-white px-3 py-1 rounded-full text-xs font-semibold">
          {distanceToTurn}
        </div>

        <div>
          <p className="font-semibold text-gray-900">
            🧭 {currentInstruction}
          </p>
        </div>
      </div>

      {/* Ride Info Card */}
      <div className="bg-white mx-4 mt-4 rounded-2xl shadow p-4">

        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
            📍
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Pickup Location
            </p>

            <h3 className="font-semibold">
              {pickupAddress}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">

          <div className="bg-gray-100 rounded-xl p-3 text-center">
            <p className="font-bold">{eta}</p>
            <p className="text-xs text-gray-500">ETA</p>
          </div>

          <div className="bg-gray-100 rounded-xl p-3 text-center">
            <p className="font-bold">{distance}</p>
            <p className="text-xs text-gray-500">Distance</p>
          </div>

          <div className="bg-gray-100 rounded-xl p-3 text-center">
            <p className="font-bold">{fare}</p>
            <p className="text-xs text-gray-500">Fare</p>
          </div>

        </div>

      </div>

      {/* Directions List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">

        <div className="bg-white rounded-2xl shadow overflow-hidden">

          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex gap-4 p-4 border-b last:border-none ${
                step.highlight
                  ? "bg-yellow-50"
                  : ""
              }`}
            >
              <div
                className={`text-2xl ${
                  step.highlight
                    ? "text-yellow-500"
                    : "text-gray-500"
                }`}
              >
                {TURN_ICONS[step.type]}
              </div>

              <div className="flex-1">
                <h4
                  className={`font-medium ${
                    step.highlight
                      ? "text-yellow-700"
                      : "text-gray-900"
                  }`}
                >
                  {step.text}
                </h4>

                {step.subtext && (
                  <p className="text-sm text-gray-500 mt-1">
                    {step.subtext}
                  </p>
                )}

                <p className="text-xs text-gray-400 mt-1">
                  {step.dist}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>

      {/* Bottom Action */}
      <div className="bg-white p-4 border-t">

        <button
          onClick={onDropOff}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold text-lg transition"
        >
          ✅ Drop Off Passenger
        </button>

      </div>

    </div>
  );
};

export default TurnByTurn;