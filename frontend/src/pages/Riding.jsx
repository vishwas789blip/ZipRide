import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, CreditCard, Home } from 'lucide-react';
import AnimatedMap from '../components/AnimationMap';
import { gsap } from 'gsap';

// ── Local Math & Route Coordinates for Vector Map ────────────────────
const routePath = [
  { x: 0.1,  y: 0.35 },
  { x: 0.3,  y: 0.37 },
  { x: 0.3,  y: 0.55 },
  { x: 0.55, y: 0.58 },
  { x: 0.55, y: 0.38 },
  { x: 0.8,  y: 0.4  },
];

function lerp(a, b, t) { return a + (b - a) * t; }

function localGetCarPos(t) {
  const total = routePath.length - 1;
  const seg = t * total;
  const i = Math.min(Math.floor(seg), total - 1);
  const f = seg - i;
  return {
    x: lerp(routePath[i].x, routePath[i + 1].x, f),
    y: lerp(routePath[i].y, routePath[i + 1].y, f),
  };
}

export default function Riding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Safely extract selected vehicle/ride parameters if passed via state
  const rideData = location.state?.vehicle || {
    price: "193.20",
    driver: "Sarthak",
    plate: "MP04 AB 1234",
    carType: "Maruti Suzuki Alto"
  };

  // Map Animation Loop Tickers
  const [carProgress, setCarProgress] = useState(0);
  const [mapOffset] = useState({ x: 0, y: 0 });
  
  // GSAP DOM Reference hooks
  const panelRef = useRef(null);

  // 1. Vector Map Car loop logic
  useEffect(() => {
    let animationFrameId;
    const animate = () => {
      setCarProgress((prev) => {
        const nextProgress = prev + 0.0015; // Slightly slower speed for active transit feel
        return nextProgress > 1 ? 0 : nextProgress;
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // 2. GSAP Entrance Sheet Animation
  useEffect(() => {
    gsap.fromTo(panelRef.current,
      { y: '100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.5, ease: 'power3.out' }
    );
  }, []);

  const currentCarPos = localGetCarPos(carProgress);

  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden relative">

      {/* Dynamic Map Underlay Section */}
      <div className="h-[45%] relative w-full overflow-hidden">
        <AnimatedMap carPos={currentCarPos} offset={mapOffset} />

        {/* Home Navigation Overlay Trigger Shortcut */}
        <button 
          onClick={() => navigate('/home')}
          className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md active:scale-95 transition-transform z-10 text-gray-700 hover:text-black"
          aria-label="Back to dashboard home"
        >
          <Home className="w-5 h-5" />
        </button>
      </div>

      {/* GSAP Managed Interactive Bottom Panel Sheet */}
      <div 
        ref={panelRef}
        className="flex-1 bg-white rounded-t-3xl px-6 py-6 shadow-2xl z-20 flex flex-col justify-between overflow-y-auto"
        style={{ opacity: 0 }}
      >
        <div>
          {/* Driver & Car Meta Split Header */}
          <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
            <div className="relative">
              <img 
                src="https://swyft.pl/ecomas/car.png" 
                alt="Active Vehicle ride" 
                className="h-16 w-auto object-contain drop-shadow"
              />
            </div>

            <div className="text-right">
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-0.5">
                Your Driver
              </p>
              <h2 className="text-xl font-bold text-gray-900 leading-tight">
                {rideData.driver}
              </h2>
              <h3 className="text-2xl font-black text-black tracking-tight my-0.5">
                {rideData.plate}
              </h3>
              <p className="text-gray-500 text-xs font-medium">
                {rideData.carType}
              </p>
            </div>
          </div>

          {/* Location Content Section */}
          <div className="flex gap-4 border-b border-gray-100 py-4 items-start">
            <div className="p-2 bg-gray-50 rounded-lg text-black mt-0.5">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-lg text-gray-900 truncate">
                562/11-A
              </h3>
              <p className="text-gray-500 text-sm truncate">
                Kankariya Talab, Bhopal
              </p>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="flex gap-4 border-b border-gray-100 py-4 items-start">
            <div className="p-2 bg-gray-50 rounded-lg text-black mt-0.5">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-extrabold text-lg text-gray-900">
                ₹{rideData.price || "193.20"}
              </h3>
              <p className="text-gray-500 text-sm font-medium">
                Cash Payment Expected
              </p>
            </div>
          </div>
        </div>

        {/* Operational Submit Action Trigger */}
        <div className="pt-4">
          <button
            onClick={() => navigate('/payment-success')}
            className="w-full bg-[#4caf50] hover:bg-[#43a047] text-white py-4 rounded-xl font-bold text-base shadow-md transition-all active:scale-[0.99] focus:outline-none"
          >
            Make a Payment
          </button>
        </div>

      </div>
    </div>
  );
}