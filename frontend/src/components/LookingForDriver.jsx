import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export default function LookingForDriverPanel({
  onDriverFound,
  onCancel,
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            onDriverFound?.();
          }, 500);

          return 100;
        }

        return prev + 2;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onDriverFound]);

  return (
    <div className="bg-white rounded-t-3xl shadow-2xl p-5 space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">
          Finding your ride...
        </h2>

        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <X size={20} />
        </button>
      </div>

      {/* Animation */}
      <div className="flex flex-col items-center justify-center py-8 space-y-4">

        <div className="relative w-24 h-24">

          <div className="absolute inset-0 border-4 border-gray-200 rounded-full animate-spin"></div>

          <div
            className="absolute inset-2 border-4 border-transparent border-t-black rounded-full"
            style={{
              animation: 'spinReverse 2s linear infinite',
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center text-3xl">
            🚗
          </div>
        </div>

        {/* Status */}
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700">

            {progress < 30 && 'Looking for nearby drivers...'}

            {progress >= 30 &&
              progress < 60 &&
              'Notifying drivers...'}

            {progress >= 60 &&
              progress < 90 &&
              'Almost there...'}

            {progress >= 90 &&
              'Driver found!'}

          </p>

          <p className="text-xs text-gray-500 mt-2">
            {Math.round(progress)}%
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">

        <div
          className="h-full bg-gradient-to-r from-black to-gray-600 transition-all duration-300"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      {/* Cancel Button */}
      <button
        onClick={onCancel}
        className="w-full bg-gray-100 hover:bg-gray-200 text-black py-3 rounded-xl font-semibold transition"
      >
        Cancel
      </button>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes spinReverse {
            from {
              transform: rotate(360deg);
            }
            to {
              transform: rotate(0deg);
            }
          }
        `}
      </style>

    </div>
  );
}