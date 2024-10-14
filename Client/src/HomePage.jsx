import React from 'react';
import { Link } from 'react-router-dom';
import home from './assets/med4.jpg';
import { FaStethoscope, FaUserMd, FaHeartbeat, FaPhoneAlt, FaFirstAid, FaTools, FaBookOpen, FaMortarPestle, FaBookMedical } from 'react-icons/fa';

const HomePage = () => {
  const currentDate = new Date();
  const dateString = `${currentDate.getDate()}/${currentDate.toLocaleString('default', { month: 'short' })}/${currentDate.getFullYear()}`;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-96 md:h-screen">
        <img src={home} alt="Medical Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-white font-extrabold text-4xl md:text-6xl mb-4">Welcome to Osamedic Lab</h1>
          <p className="text-blue-300 text-lg md:text-2xl mb-6">Your Trusted Partner in Medical Testing</p>
          <div className="flex flex-row md:flex-row gap-4">
            <Link to="#getstarted">
              <button className="px-3 md:px-6 py-2 md:py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Get Started
              </button>
            </Link>
            <a href="#services">
              <button className="px-3 md:px-6 py-2 md:py-3 bg-transparent border border-white text-white rounded-md hover:bg-white hover:text-blue-600 transition">
                Our Services
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto p-6" id="services">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Our Services</h2>
        <div className="grid hover:bg-blue-200 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <ServiceCard
            icon={<FaStethoscope size={40} className="text-blue-500" />}
            title="Accept Test"
            description="Efficiently manage and accept medical tests with our streamlined process."
            link="/patients"
          />
          <ServiceCard
            icon={<FaUserMd size={40} className="text-blue-500" />}
            title="Perform Test"
            description="Conduct a wide range of medical tests with accuracy and reliability."
            link="/accepted-patients"
          />
          <ServiceCard
            icon={<FaHeartbeat size={40} className="text-blue-500" />}
            title="Print Report"
            description="Generate comprehensive and easy-to-read reports for all your tests."
            link="/text-booking"
          />
          <ServiceCard
            icon={<FaMortarPestle size={40} className="text-blue-500" />}
            title="Masters"
            description="Generate comprehensive and easy-to-read reports for all your tests."
            link="/masters"
          />
          <ServiceCard
            icon={<FaBookMedical size={40} className="text-blue-500" />}
            title="Test Booking"
            description="Reach out to our support team for any inquiries or assistance."
            link="/test-bookings"
          />
          
          <ServiceCard
            icon={<FaBookOpen size={40} className="text-blue-500" />}
            title="Accounting"
            description="Reach out to our support team for any inquiries or assistance."
            link="/accounting/transactions"
          />
          <ServiceCard
            icon={<FaFirstAid size={40} className="text-blue-500" />}
            title="Utilities"
            description="Reach out to our support team for any inquiries or assistance."
            link="/Utilities"
          />
          <ServiceCard
            icon={<FaTools size={40} className="text-blue-500" />}
            title="Settings"
            description="Reach out to our support team for any inquiries or assistance."
            link="/settings"
          />
          {/* Add more services as needed */}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-12" id='testimonials'>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">What Our Clients Say</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <TestimonialCard
              name="Dr. Jane Smith"
              feedback="Osamedic Lab has revolutionized the way we handle medical tests. Their system is efficient and user-friendly."
            />
            <TestimonialCard
              name="John Doe"
              feedback="Reliable and accurate results every time. Highly recommend Osamedic Lab for medical testing needs."
            />
            {/* Add more testimonials as needed */}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto p-6" id="contact">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Get in Touch</h2>
        <form className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 hover:border-2 rounded-md focus:outline-none"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 hover:border-2 rounded-md focus:outline-none "
              placeholder="Your Email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
            <textarea
              id="message"
              className="w-full px-3 py-2 hover:border-2 rounded-md focus:outline-none "
              placeholder="Your Message"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-700 text-white py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Osamedic Lab. All rights reserved.
          </div>
          <div className="mb-4 md:mb-0">
            Today's Date: {dateString} | Booking Amount: $0.00
          </div>
          <Link to="/login">
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-md transition">
              Exit
            </button>
          </Link>
        </div>
      </footer>
    </div>
  );
};

// Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-transparent relative ">
      <div className="container bg-transparent bg-opacity-20 mx-auto mt-20 px-6 py-3 flex justify-between items-center">
      <div className=" md:flex space-x-6">
          <a href="#services" className="text-blue-600 hover:text-blue-300 font-bold transition">Services</a>
          <a href="#testimonials" className="text-blue-600 hover:text-blue-300 font-bold transition">Testimonials</a>
          <a href="#contact" className="text-blue-600 hover:text-blue-300 font-bold transition">Contact</a>
          <Link to="/login" className="text-blue-600 hover:text-blue-300 font-bold transition">Login</Link>
        </div>
        <div>
          <Link to="/" className="text-blue-600 hidden md:inline text-2xl font-bold">Osamedic Lab</Link>
        </div>
      </div>
    </nav>
  );
};



// ServiceCard Component
const ServiceCard = ({ icon, title, description, link }) => {
  return (
    <div className="bg-white hover:bg-blue-50 rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-blue-600">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link to={link} className="text-blue-500 hover:text-blue-600 hover:underline">Click Here</Link>
    </div>
  );
};

// TestimonialCard Component
const TestimonialCard = ({ name, feedback }) => {
  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-md">
      <p className="text-gray-700 italic mb-4">"{feedback}"</p>
      <h4 className="text-blue-600 font-semibold">{name}</h4>
    </div>
  );
};

export default HomePage;
