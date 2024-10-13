import PropTypes from "prop-types";

const Section = ({ className = "" }) => {
  return (
    <div className={`bg-gray-100 ${className} py-8`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-gray-800 font-semibold">
                Website designed with the B12 website builder. Create your own website today.
              </div>
            </div>
          </div>
          <div className="mt-4">
            <a
              href="#"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Start for free
            </a>
          </div>
        </div>
        <div className="relative mt-8">
          <div className="absolute inset-0 bg-gray-300 opacity-50 rounded-lg" />
          <div className="absolute inset-0 bg-gray-400 opacity-30 rounded-lg transform scale-95" />
        </div>
      </div>
    </div>
  );
};

Section.propTypes = {
  className: PropTypes.string,
};

export default Section;
