import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from "./assets/company.png";
import * as Icons from 'react-bootstrap-icons'

const NavBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleResize = () => {
    const isMobileView = window.innerWidth < 800;
    setIsMobile(isMobileView);
    if (!isMobileView) {
      setCollapsed(false); // Expand if desktop
    } else {
      setCollapsed(true); // Collapse by default if mobile
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setIsMobile(window.innerWidth < 800);
    setCollapsed(window.innerWidth < 800); // Ensure collapsed on initial load if mobile
  }, []);

  return (
    <nav className="bg-white text-slate-900 shadow-lg p-4 fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex flex-row items-center">
          <img src={Logo} alt="Company Logo" className="h-12 w-auto" />
          <h2 className="ml-3 font-bold text-2xl flex flex-row">Osamed <span>Lab</span> </h2>
        </Link>

        {/* Hamburger for Mobile */}
        {isMobile && (
          <button
            className="text-slate-900 bg-slate-900 focus:outline-none"
            onClick={toggleCollapse}
          >
            <i className={`bx ${collapsed ? 'bx-menu' : 'bx-x'} text-3xl`}></i>
          </button>
        )}

        {/* Nav Links */}
        <div
          className={`${
            isMobile && collapsed ? 'hidden' : 'block'
          } md:flex md:items-center md:space-x-8`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 mt-4 md:mt-0 font-bold text-slate-900">
            <li className="hover:text-blue-600">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-blue-600">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="hover:text-blue-600">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="hover:text-blue-600">
              <Link to="/register">Register</Link>
            </li>
            <li className="hover:text-blue-600">
              <Link to="/barcode">Barcode</Link>
            </li>
            <li className="relative group">
              <button className="hover:text-gray-200 focus:outline-none flex items-center">
                More <i className="bx bxs-chevron-down ml-1"></i>
              </button>
              <ul className="absolute hidden group-hover:block bg-white text-black rounded-lg shadow-lg mt-2 w-40 z-20">
                <li className="hover:bg-gray-100 p-2 rounded-t-md">
                  <Link to="/general">Option 1</Link>
                </li>
                <li className="hover:bg-gray-100 p-2">
                  <Link to="/generals">Option 2</Link>
                </li>
                <li className="hover:bg-gray-100 p-2 rounded-b-md">
                  <Link to="#">Option 3</Link>
                </li>
              </ul>
            </li>
          </ul>

          {/* Search Box */}
          <div className="relative mt-4 md:mt-0">
            <i className="bx bx-search absolute top-2 left-3 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg bg-white text-black w-full md:w-60 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
