import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserDataContext } from '../context/userContext';

import AnimatedMap from '../components/AnimationMap';
import LocationSearchPannel from '../components/LocationSearchPannel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import DriverFoundPanel from '../components/DriverFoundPanel';

export default function Home() {
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [activeField, setActiveField] = useState(null);

  const [showVehicles, setShowVehicles] = useState(false);
  const [showConfirmRide, setShowConfirmRide] = useState(false);
  const [showLookingDriver, setShowLookingDriver] = useState(false);
  const [showDriverFound, setShowDriverFound] = useState(false);

  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLocationSelect = (location) => {
    if (activeField === 'pickup') {
      setPickup(location);
    } else if (activeField === 'destination') {
      setDestination(location);
    }
    setActiveField(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden relative">

      {/* MAP */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatedMap />

        {/* HEADER */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">

          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <span className="text-[#d5622d] text-xs font-bold">Z</span>
            </div>

            <span className="font-medium">
              Zip<span className="text-[#d5622d]">Ride</span>
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="bg-white px-3 py-2 rounded-full shadow text-[#d5622d] text-sm font-medium"
          >
            Logout
          </button>
        </div>

        {/* USER */}
        {user?.fullName?.firstName && (
          <div className="absolute top-16 left-4 bg-white px-3 py-1 rounded-xl text-sm shadow z-20">
            Hi, {user.fullName.firstName} 👋
          </div>
        )}
      </div>

      {/* BOTTOM PANEL */}
      <div className="bg-white rounded-t-3xl px-5 py-6 shadow-2xl z-30 max-h-[85vh] overflow-y-auto">

        {/* STEP 1 - SEARCH */}
        {!showVehicles &&
          !showConfirmRide &&
          !showLookingDriver &&
          !showDriverFound && (
            <>
              <h2 className="text-xl font-semibold mb-5">
                Find a Trip
              </h2>

              {/* PICKUP */}
              <div
                className={`flex items-center gap-3 border rounded-xl px-4 py-3 mb-3 ${
                  activeField === 'pickup'
                    ? 'border-[#d5622d]'
                    : 'border-gray-200'
                }`}
              >
                <div className="w-3 h-3 border-2 border-black rounded-full" />

                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  onFocus={() => setActiveField('pickup')}
                  placeholder="Pickup Location"
                  className="flex-1 outline-none bg-transparent"
                />
              </div>

              {/* DESTINATION */}
              <div
                className={`flex items-center gap-3 border rounded-xl px-4 py-3 ${
                  activeField === 'destination'
                    ? 'border-[#d5622d]'
                    : 'border-gray-200'
                }`}
              >
                <div className="w-3 h-3 bg-black rounded-sm" />

                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onFocus={() => setActiveField('destination')}
                  placeholder="Enter Destination"
                  className="flex-1 outline-none bg-transparent"
                />
              </div>

              {/* LOCATION PANEL */}
              {activeField && (
                <div className="mt-4 border-t pt-3">
                  <LocationSearchPannel
                    onSelect={handleLocationSelect}
                  />
                </div>
              )}

              {/* SEARCH BUTTON */}
              {pickup && destination && !activeField && (
                <button
                  onClick={() => setShowVehicles(true)}
                  className="w-full mt-4 bg-black text-white py-3 rounded-xl font-medium"
                >
                  Search Rides
                </button>
              )}
            </>
          )}

        {/* STEP 2 - CHOOSE VEHICLE */}
        {showVehicles && !showConfirmRide && (
          <>
            <button
              onClick={() => setShowVehicles(false)}
              className="mb-4 text-gray-500"
            >
              ← Back
            </button>

            <VehiclePanel
              onConfirm={(vehicle) => {
                setSelectedVehicle(vehicle);
                setShowVehicles(false);
                setShowConfirmRide(true);
              }}
            />
          </>
        )}

        {/* STEP 3 - CONFIRM RIDE */}
        {showConfirmRide && (
          <ConfirmRide
            pickup={pickup}
            destination={destination}
            vechicle={selectedVehicle}
            price={selectedVehicle?.price}
            onBack={() => {
              setShowConfirmRide(false);
              setShowVehicles(true);
            }}
            onConfirm={() => {
              setShowConfirmRide(false);
              setShowLookingDriver(true);
            }}
          />
        )}

        {/* STEP 4 - LOOKING FOR DRIVER */}
        {showLookingDriver && (
          <LookingForDriver
            onCancel={() => {
              setShowLookingDriver(false);
              setShowVehicles(true);
            }}
            onDriverFound={() => {
              setShowLookingDriver(false);
              setShowDriverFound(true);
            }}
          />
        )}



        {/* STEP 5 - DRIVER FOUND */}
        {showDriverFound && (
          <DriverFoundPanel
            pickup={pickup}
            onContact={(type) => {
              console.log(type);
            }}
            onStartRide={() => {
              navigate('/riding');
            }}
          />
        )}

      </div>
    </div>
  );
}