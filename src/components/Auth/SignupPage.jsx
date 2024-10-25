import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUserShield } from 'react-icons/fa'; // Import icons
import Logo from '../../assets/med4.jpg';
import Logo3 from '../../assets/med1.jpg';
import Logo4 from '../../assets/med2.jpg';
import Logo2 from '../../assets/med3.jpg';

function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false); // Admin login state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://osamedic.onrender.com/signup', { email, password, isAdmin });
            alert(response.data); // Display server response
            navigate('/login');
        } catch (error) {
            alert(error.response ? error.response.data : 'Signup failed');
        }
    };

    
    function ImageCarousel() {
        const images = [Logo, Logo2, Logo3, Logo4]; 
        const [currentIndex, setCurrentIndex] = useState(0);

        useEffect(() => {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 4000); // Change image every 4 seconds
            return () => clearInterval(interval); // Cleanup
        }, [images.length]);

        return (
            <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
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

                {/* image carousel */}
                <div className="absolute inset-0 flex  transition-transform duration-1000" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        ))}
      </div>
      <div className='relative justify-center flex flex-col items-center mt-20 z-50 '>
      <h1 className="text-white mt-20 font-extrabold text-4xl md:text-6xl mb-4">Osamedic Lab</h1>
      <p className="text-blue-600 text-lg md:text-2xl mb-6">Your Trusted Partner in Medical Testing</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col  md:flex-row h-screen bg-white">
            {/* Carousel Section */}
            <div className="flex-1 mb-20 pt-20 mt-20  flex justify-center items-center p-2">
                <div className=" mt-20  mb-20 absolute w-full max-w-lg">
                    <ImageCarousel />
                </div>
            </div>

            {/* Signup Form */}
            <div className="flex-1 flex justify-center mt-20 items-center bg-white p-10 md:p-20">
                <form onSubmit={handleSubmit} className="bg-white  w-full max-w-md rounded-lg shadow-2xl p-8 space-y-6">
                    <h1 className="text-4xl font-bold text-center  text-blue-600">Create Account</h1>
                    <p className="text-center text-gray-500">Sign up to access exclusive features</p>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <div className="flex items-center bg-gray-100 border rounded-lg p-3">
                            <FaEnvelope className="text-gray-500 mr-3" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="bg-transparent outline-none w-full"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <div className="flex items-center bg-gray-100 border rounded-lg p-3">
                            <FaLock className="text-gray-500 mr-3" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                className="bg-transparent outline-none w-full"
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                            className="h-4 w-4 text-blue-400 rounded focus:ring-0"
                        />
                        <label className="ml-2 text-gray-700">Sign up as admin</label>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                        Register
                    </button>

                    <div className="text-center text-gray-500 mt-4">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-600 hover:underline">
                            Sign in
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;
