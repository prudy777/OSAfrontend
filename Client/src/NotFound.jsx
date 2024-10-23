import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotAvailablePage = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    if (countdown === 0) {
      navigate('/');
    }

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-600">
      <div className="text-center bg-blue-400  p-10 rounded-xl shadow-2xl animate-fadeIn space-y-6 max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-white">Page Not Available</h1>
        <p className="text-lg text-red-500">This page is currently unavailable. You will be redirected to the home page shortly.</p>
        <div className="text-2xl font-semibold text-white">Redirecting in {countdown} seconds...</div>
      </div>
    </div>
  );
};

export default NotAvailablePage;
