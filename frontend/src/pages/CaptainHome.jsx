import React, { useState } from "react";
import CaptainRidePopUp from "../components/CaptainRidePopUp";

const CaptainHome = ({ captain = {} }) => {
  const [isOnline, setIsOnline] = useState(true);

  const [showRidePopup, setShowRidePopup] = useState(false);
  const [ride, setRide] = useState(null);

  const {
    firstName = "Rahul",
    lastName = "Kumar",
    rating = 4.9,
    todayEarnings = 842,
    todayRides = 3,
  } = captain;

  const initials = `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();

  const recentTrips = [
    {
      id: 1,
      name: "Harshi Pateliya",
      from: "Kankariya Talab",
      to: "Sector 12",
      fare: "₹193",
      time: "10:24 AM",
      status: "done",
    },
    {
      id: 2,
      name: "Harsh Patel",
      from: "MG Road",
      to: "Vaishali Metro",
      fare: "₹310",
      time: "9:05 AM",
      status: "done",
    },
    {
      id: 3,
      name: "Anjali Mehta",
      from: "Indirapuram",
      to: "Noida Sec 18",
      fare: "Cancelled",
      time: "8:30 AM",
      status: "cancel",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto relative">

      {/* Header */}
      <div className="bg-white shadow-sm px-5 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-lg text-gray-900">
            {initials}
          </div>

          <div>
            <h2 className="font-bold text-gray-900">
              {firstName} {lastName}
            </h2>

            <p className="text-sm text-gray-500">
              Captain Dashboard
            </p>
          </div>
        </div>

        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
            isOnline ? "bg-green-500" : "bg-gray-500"
          }`}
        >
          {isOnline ? "Online" : "Offline"}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-28">

        {/* Greeting */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-gray-900">
            👋 Welcome, {firstName}
          </h1>

          <p className="text-gray-500">
            {isOnline
              ? "You're available for rides"
              : "You're currently offline"}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">

          <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
            <p className="text-xl font-bold text-green-600">
              ₹{todayEarnings}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Earnings
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
            <p className="text-xl font-bold text-gray-900">
              {todayRides}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Rides
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
            <p className="text-xl font-bold text-yellow-500">
              ⭐ {rating}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Rating
            </p>
          </div>

        </div>

        {/* Recent Trips */}
        <div className="bg-white rounded-2xl shadow-sm p-4">

          <h3 className="font-bold text-lg mb-4">
            📋 Recent Trips
          </h3>

          <div className="space-y-3">

            {recentTrips.map((trip) => (
              <div
                key={trip.id}
                className="flex items-center gap-3 border-b last:border-none pb-3"
              >

                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    trip.status === "done"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {trip.status === "done" ? "✓" : "✕"}
                </div>

                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {trip.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {trip.from} → {trip.to}
                  </p>
                </div>

                <div className="text-right">
                  <p
                    className={`font-bold ${
                      trip.status === "cancel"
                        ? "text-red-500"
                        : "text-gray-900"
                    }`}
                  >
                    {trip.fare}
                  </p>

                  <p className="text-xs text-gray-400">
                    {trip.time}
                  </p>
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

      {/* Bottom Online / Offline Toggle */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg border flex overflow-hidden">

        <button
          onClick={() => setIsOnline(true)}
          className={`px-8 py-3 font-bold transition ${
            isOnline
              ? "bg-black text-white"
              : "bg-white text-gray-400"
          }`}
        >
          GO
        </button>

        <button
          onClick={() => setIsOnline(false)}
          className={`px-8 py-3 font-bold transition ${
            !isOnline
              ? "bg-black text-white"
              : "bg-white text-gray-400"
          }`}
        >
          OFF
        </button>

      </div>

    </div>
  );
}-

export default CaptainHome;