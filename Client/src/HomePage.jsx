import React from 'react';
import { Link } from 'react-router-dom';
import acceptTestImg from './assets/accept test.png';
import accountingImg from './assets/Accounting.png';
import mastersImg from './assets/masters.png';
import performTestImg from './assets/perform test.png';
import printReportImg from './assets/print report.png';
import settingsImg from './assets/settings.png';
import testLibraryImg from './assets/test library.png';
import utilitiesImg from './assets/Utilities.png';
import home from './assets/med4.jpg';

const HomePage = () => {
  const currentDate = new Date();
  const dateString = `${currentDate.getDate()}/${currentDate.toLocaleString('default', { month: 'short' })}/${currentDate.getFullYear()}`;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-blue-200">
      {/* Hero Section */}
      <div className="relative h-80 md:h-screen">
        <img src={home} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
        <div className="mt-8 md:mt-16 flex flex-col text-center">
        <h1 className="text-black font-bold text-4xl md:text-6xl">Osamedic Lab</h1>
        <span className="text-blue-500 font-bold text-lg md:text-xl">VER. 1.0.0</span>
        <div className='flex justify-center items-center flex-row'>
        <button className='shadow-lg rounded-md bg-blue-400 hover:bg-blue-500 hover:text-black font-bold p-2 text-white m-1 md:m-2'>About US</button>
        <a href='#getstarted' className='shadow-lg rounded-md bg-blue-400 hover:bg-blue-500 hover:text-black font-bold p-2 text-white m-1 md:m-2'>Get Started</a>
        </div>
      </div>

        </div>
      </div>

      {/* Title and Version */}
      <div className="mt-8 md:mt-16 text-center" id='getstarted'>
        <h1 className="text-blue-900 font-bold text-2xl md:5xl">Get Started</h1>
      </div>

      {/* Grid Section */}
      <div className="container mx-auto p-4 mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card title="Accept Test" image={acceptTestImg} link="/patients" />
          <Card title="Perform Test" image={performTestImg} link="/accepted-patients" />
          <Card title="Print Report" image={printReportImg} link="/text-booking" />
          <Card title="Accounting" image={accountingImg} link="/accounting/transactions" />
          <Card title="Utilities" image={utilitiesImg} link="/utilities" />
          <Card title="Settings" image={settingsImg} link="/settings" />
          <Card title="Masters" image={mastersImg} link="/masters" />
          <Card title="Test Library" image={testLibraryImg} link="/test-bookings" />
        </div>
      </div>

      {/* Footer Section */}
      <footer className="p-4 bg-blue-500 text-white flex flex-col items-center md:flex-row justify-between">
        <div className="font-bold mb-2 md:mb-0">Today's Date: {dateString}</div>
        <div className="font-bold mb-2 md:mb-0">Today's Booking Amount: 0.00</div>
        <Link to='/login'>
          <button className="bg-white text-red-600 hover:bg-red-800 hover:text-white font-bold px-4 py-2 rounded-lg shadow-lg">
            Exit
          </button>
        </Link>
      </footer>
    </div>
  );
};

// Reusable Card Component
const Card = ({ title, image, link }) => {
  return (
    <div className="bg-blue-400 text-black font-bold flex flex-col items-center p-4 shadow-lg rounded-lg hover:bg-white transition-all transform hover:scale-105">
      <img src={image} alt={title} className="w-18 h-16 mb-5" />
      <Link to={link}>
        <span className="text-center bg-white shadow-lg border-2 hover:border-blue-400 hover:bg-transparent rounded-full hover:text-blue-700 p-1">
          {title}
        </span>
      </Link>
    </div>
  );
};

export default HomePage;
