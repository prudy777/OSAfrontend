import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext'; // Assuming this is set up correctly
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/med4.jpg';
import Logo3 from '../../assets/med1.jpg';
import Logo4 from '../../assets/med2.jpg';
import Logo2 from '../../assets/med3.jpg';
import * as Icons from 'react-bootstrap-icons';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function ImageCarousel() {
  const images = [Logo, Logo2, Logo3, Logo4]; // Images for the carousel
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval); // Cleanup
  }, [images.length]);

  return (
    <div className="relative m-20 p-10 mr-10 w-full h-full overflow-hidden">
      <div className="absolute inset-0 flex transition-transform duration-1000" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        ))}
        
      </div>
      {/* Dots for pagination */}
      <div className="absolute px-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
          />
        ))}
      </div>

      <div className='relative justify-center flex flex-col items-center mt-20 z-50 '>
      <h1 className="text-white mt-20 font-extrabold text-4xl md:text-6xl mb-4">Osamedic Lab</h1>
      <p className="text-blue-600 text-lg md:text-2xl mb-6">Your Trusted Partner in Medical Testing</p>
                </div>
          </div>
  );
}

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Auth context for login
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await login({ email, password }); 
      navigate('/HomePage'); 
    } catch (error) {
      alert('Invalid credentials or login failed');
    }
  };

  return (
    <div className="relative bg-white min-h-screen flex">
      {/* Carousel Section */}
      <div className="hidden md:block w-1/2">
        <ImageCarousel />
      </div>

      {/* Login Form Section */}
      <div className="flex-1 flex px-10 mt-20 items-center justify-center">
        <div className="w-full p-10 md:ml-10 max-w-md px-6 py-8 bg-white shadow-lg rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <h1 className="text-3xl font-bold text-center text-blue-600">Login</h1>

            {/* Subtitle */}
            <p className="text-center text-gray-600">Log in to access your dashboard</p>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                <div className="flex items-center">
                  <Icons.Envelope width={20} height={20} className="text-blue-500 mr-2" />
                  Email
                </div>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                <div className="flex items-center">
                  <Icons.Lock width={20} height={20} className="text-blue-500 mr-2" />
                  Password
                </div>
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*******"
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>

            {/* Additional Links */}
            <div className="text-center">
              <a href="/signup" className="text-blue-600 hover:underline">
                Create an account
              </a>
              <span className="text-gray-500 mx-2">|</span>
              <a href="/forgot-password" className="text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
