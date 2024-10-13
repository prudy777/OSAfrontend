import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/company.png';
import Logo3 from '../../assets/osamedic .jpeg';
import Logo4 from '../../assets/osamedic 2.jpeg';
import * as Icons from 'react-bootstrap-icons'


const allowedEmail = 'prudy777@gmail.com';
const allowedPassword = 'progees';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [currentBackground, setCurrentBackground] = useState(0);
  const [nextBackground, setNextBackground] = useState(1);
  const [isSliding, setIsSliding] = useState(false);

  const backgroundImages = [
    `linear-gradient(to right, #ff416c, #ff4b2b)`, // Initial gradient
    `url(${Logo3})`,
    `url(${Logo4})`
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true);

      setTimeout(() => {
        setCurrentBackground(nextBackground);
        setNextBackground((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        setIsSliding(false);
      }, 500); // Duration of the slide animation (0.5s)
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [nextBackground]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === allowedEmail && password === allowedPassword) {
      login({ email, password }, 'fakeToken'); // Replace 'fakeToken' with actual token logic if needed
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex  md:flex-rows-2 min-h-screen bg-blue-200 overflow-hidden">
      {/* Background Section */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 mt-20 ${
          isSliding ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundImage: backgroundImages[currentBackground],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isSliding ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: backgroundImages[nextBackground],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Overlay Content */}
      <div className="relative flex-grow hidden md:inline flex-1 flex-col justify-center items-center bg-blue-200 bg-opacity-50">
        <div className='m-20'>
        <div className="mt-8 md:mt-16 flex flex-col text-center mt-20">
          <div className='justify-center items-center flex mt-20'>
          <img src={Logo} alt="" className='w-40 h-40 p-5'/>
          </div>
        <h1 className="text-black font-bold text-4xl md:text-6xl">Osamedic Lab</h1>
        <span className="text-blue-700 font-bold text-lg md:text-xl">VER. 1.0.0</span>
        </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="relative z-5 flex-1 justify-center mt-10 items-center py-8 bg-blue-200 shadow-lg">
        <div className="w-full max-w-md px-6 m-10 md:m-20">
          <form onSubmit={handleSubmit} className="space-y-6 mb-10  p-2 shadow-lg rounded-lg bg-blue-100 hover:bg-blue-200">
          <h1 className="text-3xl font-bold text-center m-10 text-slate-800 mb-5 pt-5">Login</h1>
          <p className='text-xl font-semibold text-center  text-black-800 mb-6'>Log In to continue</p>
            <div >
              <label htmlFor="email" className="block flex flex-row text-black mb-2">
                <div className='flex-row flex text-black font-bold p-2'>
                <Icons.Envelope width={20} height={20} className='text-black mr-2 '/>
                <p className='text-black font-bold mr-2 text-xl flex flex-row'> Email</p> 
                </div>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-96 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className='flex flex-row' >
              <div className='flex-row flex text-black font-bold p-2'>
                <Icons.LockFill width={20} height={20} className='text-black mr-2 '/>
                <p className='text-black font-bold mr-2 text-xl flex flex-row'> Password</p> 
                </div>
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*******"
                required
                className="w-96 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-96 bg-blue-500 text-white py-2 shadow-lg rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Login
            </button>
            {/* Optional: Add Sign Up or Forgot Password Links */}
          <div className="text-center">
             <a href="/signup" className="text-blue-600 hover:underline">
              Create an account
            </a> 
             <a href="/forgot-password" className="text-blue-500 hover:underline ml-4">
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
