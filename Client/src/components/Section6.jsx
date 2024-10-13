import { useCallback } from "react";
import PropTypes from "prop-types";

const Section6 = ({ className = "" }) => {
  const onLinkContainerClick = useCallback(() => {
    window.open("https://www.b12.io/ai-web-design/");
  }, []);

  return (
    <footer className={`bg-gray-800 text-white ${className}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <div className="flex space-x-6">
            <div>
              <a className="hover:text-gray-400" href="#">Services</a>
            </div>
            <div>
              <a
                className="hover:text-gray-400"
                href="https://osamedic-records.b12sites.com/scheduling"
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule appointment
              </a>
            </div>
            <div>
              <a
                className="hover:text-gray-400"
                href="https://osamedic-records.b12sites.com/intake-form"
                target="_blank"
                rel="noopener noreferrer"
              >
                Complete intake
              </a>
            </div>
            <div>
              <a className="hover:text-gray-400" href="#">Contact</a>
            </div>
          </div>

          <div className="flex items-center">
            <div
              className="cursor-pointer hover:text-gray-400"
              onClick={onLinkContainerClick}
            >
              <span>Web design by Osamedic LTD</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 my-4" />
      </div>
    </footer>
  );
};

Section6.propTypes = {
  className: PropTypes.string,
};

export default Section6;
