import { useCallback } from "react";
import PropTypes from "prop-types";

const Section4 = ({ className = "" }) => {
  const onLinkReadMoreClick = useCallback(() => {
    window.open("https://osamedic-records.b12sites.com/sales-dashboard");
  }, []);

  const onLinkReadMoreClick1 = useCallback(() => {
    window.open("https://osamedic-records.b12sites.com/data-visualization-tools");
  }, []);

  const onLinkReadMoreClick2 = useCallback(() => {
    window.open("https://osamedic-records.b12sites.com/report-retrieval-widgets");
  }, []);

  return (
    <section className={`py-12 px-4 bg-gray-100 ${className}`}>
      <div className="container mx-auto">
        <div className="mb-8">
          <h2 className="text-center text-2xl font-bold text-blue-600 mb-2">
            Our platform features
          </h2>
          <h3 className="text-center text-3xl font-bold text-gray-800">
            Unleashing data potential
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
            <img
              className="w-full max-w-xs mb-4"
              loading="lazy"
              alt=""
              src="/figure-1@2x.png"
            />
            <div className="text-center">
              <a
                className="text-blue-600 font-semibold hover:underline"
                href="https://osamedic-records.b12sites.com/sales-dashboard"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sales dashboard
              </a>
              <p className="text-gray-600 mt-2">
                Visualize your sales data like never before.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
            <img
              className="w-full max-w-xs mb-4"
              loading="lazy"
              alt=""
              src="/figure-2@2x.png"
            />
            <div className="text-center">
              <a
                className="text-blue-600 font-semibold hover:underline"
                href="https://osamedic-records.b12sites.com/data-visualization-tools"
                target="_blank"
                rel="noopener noreferrer"
              >
                Data visualization tools
              </a>
              <p className="text-gray-600 mt-2">
                Transform complex data into clear visuals.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
            <img
              className="w-full max-w-xs mb-4"
              loading="lazy"
              alt=""
              src="/figure-3@2x.png"
            />
            <div className="text-center">
              <a
                className="text-blue-600 font-semibold hover:underline"
                href="https://osamedic-records.b12sites.com/report-retrieval-widgets"
                target="_blank"
                rel="noopener noreferrer"
              >
                Report retrieval widgets
              </a>
              <p className="text-gray-600 mt-2">
                Quickly access detailed reports with ease.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Section4.propTypes = {
  className: PropTypes.string,
};

export default Section4;
