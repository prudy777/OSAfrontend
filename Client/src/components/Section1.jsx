import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Section1 = ({ className = "" }) => {
  return (
    <div className={`bg-white shadow-md py-4 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a
            href="/"
            target="_blank"
            className="text-xl font-bold text-blue-600 hover:text-blue-700"
          >
            Osamedic Records
          </a>
          <nav className="flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Home
            </Link>
            <Link
              to="/profile"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              About
            </Link>
            <Link
              to="/register"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Services
            </Link>
            <a
              href="https://osamedic-records.b12sites.com/index#contact"
              target="_blank"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

Section1.propTypes = {
  className: PropTypes.string,
};

export default Section1;
