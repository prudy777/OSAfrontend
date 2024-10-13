import PropTypes from "prop-types";

const Section2 = ({ className = "" }) => {
  return (
    <div className={`relative bg-white text-center py-12 px-6 ${className}`}>
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        loading="lazy"
        alt="Gradient background"
        src="/gradientimage@2x.png"
      />
      <div className="relative z-10">
        <div className="max-w-xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">Osamedic Records</h1>
          <p className="text-lg text-gray-600 mb-6">
            Real-time Sales Data Visualization and Reporting
          </p>
          <a
            href="https://osamedic-records.b12sites.com/index#services"
            target="_blank"
            className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            View Services
          </a>
        </div>
      </div>
    </div>
  );
};

Section2.propTypes = {
  className: PropTypes.string,
};

export default Section2;
