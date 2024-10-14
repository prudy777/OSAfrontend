import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from "./assets/company.png"; 
import { 
  FaBars, 
  FaTimes, 
  FaHome, 
  FaTachometerAlt, 
  FaUser, 
  FaClipboardList, 
  FaBarcode, 
  FaEllipsisH, 
  FaSearch 
} from 'react-icons/fa';
import { MdArrowDropDown } from 'react-icons/md';

const NavBar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 800;
      setIsMobile(isMobileView);
      if (!isMobileView) {
        setMenuOpen(false); // Ensure menu is closed on desktop view
        setMoreOpen(false); // Ensure "More" dropdown is closed on desktop view
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle main menu in mobile view
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      setMoreOpen(false); // Close "More" dropdown when opening the menu
    }
  };

  // Toggle "More" dropdown in mobile view
  const toggleMore = () => {
    setMoreOpen(!moreOpen);
  };

  // Close menus when a link is clicked
  const handleLinkClick = () => {
    if (isMobile) {
      setMenuOpen(false);
      setMoreOpen(false);
    }
  };

  // Handle click outside for desktop "More" dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If not mobile and the click target is not inside the "More" button or dropdown, close the dropdown
      if (!isMobile && moreOpen) {
        const moreButton = document.getElementById('more-button');
        const dropdownMenu = document.getElementById('more-dropdown');
        if (moreButton && !moreButton.contains(event.target) && dropdownMenu && !dropdownMenu.contains(event.target)) {
          setMoreOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, moreOpen]);

  return (
    <nav className="bg-white text-black fixed w-full z-20 shadow-md">
      <div className="max-w-7xl mx-auto my-3 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img src={Logo} alt="Company Logo" className="h-8 w-8 md:h-10 md:w-10 object-contain" />
              <span className="ml-2 text-blue-500 text-xl md:text-2xl font-bold">Osamed Lab</span>
            </Link>
          </div>

          {/* Hamburger Menu for Mobile */}
          {isMobile && (
            <div className="flex items-center">
              <button 
                onClick={toggleMenu} 
                className="text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                aria-label="Toggle Menu"
              >
                {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <div className={`flex-1 mx-5 flex hidden md:inline items-center justify-end ${isMobile ? (menuOpen ? 'block' : 'hidden') : 'block'}`}>
            <ul className="flex mx-5 flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 mt-4 md:mt-0 font-bold">
              {/* Home */}
              <li>
                <Link 
                  to="/" 
                  onClick={handleLinkClick}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-300 transition-colors"
                >
                  <FaHome className="mr-2" />
                  Home
                </Link>
              </li>

              {/* Dashboard */}
              <li>
                <Link 
                  to="/DashboardPage" 
                  onClick={handleLinkClick}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-300 transition-colors"
                >
                  <FaTachometerAlt className="mr-2" />
                  Dashboard
                </Link>
              </li>

              {/* Profile */}
              <li>
                <Link 
                  to="/profile" 
                  onClick={handleLinkClick}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-300 transition-colors"
                >
                  <FaUser className="mr-2" />
                  Profile
                </Link>
              </li>

              {/* Register */}
              <li>
                <Link 
                  to="/register" 
                  onClick={handleLinkClick}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-300  transition-colors"
                >
                  <FaClipboardList className="mr-2" />
                  Register
                </Link>
              </li>

              {/* Barcode */}
              <li>
                <Link 
                  to="/barcode" 
                  onClick={handleLinkClick}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-300 transition-colors"
                >
                  <FaBarcode className="mr-2" />
                  Barcode
                </Link>
              </li>

              {/* More Dropdown */}
              <li className="relative group">
                <button 
                  onClick={isMobile ? toggleMore : undefined}
                  id="more-button"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-300 transition-colors focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={moreOpen ? "true" : "false"}
                >
                  <FaEllipsisH className="mr-2" />
                  More
                  <MdArrowDropDown className="ml-1" />
                </button>
                {/* Dropdown Menu */}
                <ul 
                  id="more-dropdown" 
                  className={`absolute left-0 mt-2 w-40 bg-white text-slate-900 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-300 ${
                    isMobile && moreOpen ? 'block opacity-100 visible' : ''
                  }`}
                >
                  <li>
                    <Link 
                      to="/general" 
                      onClick={handleLinkClick}
                      className="block px-2 py-2 hover:bg-gray-200 transition-colors"
                    >
                      Option 1
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/generals" 
                      onClick={handleLinkClick}
                      className="block px-2 py-2 hover:bg-gray-200 transition-colors"
                    >
                      Option 2
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="#" 
                      onClick={handleLinkClick}
                      className="block px-2 py-2 hover:bg-gray-200 transition-colors"
                    >
                      Option 3
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link 
                  to="/SignupPage" 
                  onClick={handleLinkClick}
                  className="flex items-center mx-5 px-3 py-2 rounded-full text-white text-xl bg-blue-500  font-medium  transition-colors"
                >
                  <FaUser className="mr-2" />
                  signup
                </Link>
              </li>

            </ul>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobile && menuOpen && (
          <div className="md:hidden bg-white">
            <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Home */}
              <li>
                <Link 
                  to="/" 
                  onClick={handleLinkClick}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-300 transition-colors"
                >
                  <FaHome className="mr-2" />
                  Home
                </Link>
              </li>

              {/* Dashboard */}
              <li>
                <Link 
                  to="/dashboard" 
                  onClick={handleLinkClick}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-300 transition-colors"
                >
                  <FaTachometerAlt className="mr-2" />
                  Dashboard
                </Link>
              </li>

              {/* Profile */}
              <li>
                <Link 
                  to="/profile" 
                  onClick={handleLinkClick}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-300 transition-colors"
                >
                  <FaUser className="mr-2" />
                  Profile
                </Link>
              </li>

              {/* Register */}
              <li>
                <Link 
                  to="/register" 
                  onClick={handleLinkClick}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-300 transition-colors"
                >
                  <FaClipboardList className="mr-2" />
                  Register
                </Link>
              </li>

              {/* Barcode */}
              <li>
                <Link 
                  to="/barcode" 
                  onClick={handleLinkClick}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-300 transition-colors"
                >
                  <FaBarcode className="mr-2" />
                  Barcode
                </Link>
              </li>

              {/* More Dropdown */}
              <li className="relative group">
                <button 
                  onClick={toggleMore}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-300 transition-colors focus:outline-none w-full text-left"
                  aria-haspopup="true"
                  aria-expanded={moreOpen ? "true" : "false"}
                >
                  <FaEllipsisH className="mr-2" />
                  More
                  <MdArrowDropDown className="ml-auto" />
                </button>
                {/* Dropdown Menu */}
                <ul className={`bg-indigo-600 ${moreOpen ? 'block' : 'hidden'}`}>
                  <li>
                    <Link 
                      to="/general" 
                      onClick={handleLinkClick}
                      className="block px-6 py-2 text-black hover:bg-blue-300 transition-colors"
                    >
                      Option 1
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/generals" 
                      onClick={handleLinkClick}
                      className="block px-6 py-2 text-black hover:bg-blue-300 transition-colors"
                    >
                      Option 2
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="#" 
                      onClick={handleLinkClick}
                      className="block px-6 py-2 text-black hover:bg-blue-300 transition-colors"
                    >
                      Option 3
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Search Box */}
              <li>
                <Link 
                  to="/SignupPage" 
                  onClick={handleLinkClick}
                  className="flex items-center justify-center px-3 py-2 rounded-full text-black text-xl bg-blue-600  font-medium  transition-colors"
                >
                  <FaUser className="mr-2" />
                  signup
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
