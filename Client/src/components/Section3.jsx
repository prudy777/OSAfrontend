import PropTypes from "prop-types";

const Section3 = ({ className = "" }) => {
  return (
    <section className={`py-12 px-4 bg-white ${className}`}>
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="flex-1 mb-8 md:mb-0">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-blue-600 mb-2">
              Data at your fingertips
            </h3>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Transforming sales insights
          </h2>
          <div className="text-gray-600 mb-6">
            <p className="mb-2">
              Osamedic Records empowers you with a dynamic dashboard platform that visualizes sales data in real-time. Our tools, including GraphQL bar charts and customizable tables, help you track performance over weeks, months, and years. Based in Lagos, we strive to make data accessible and actionable, ensuring you stay informed and ahead in your business decisions.
            </p>
            <p>
              Experience the future of data management with us.
            </p>
          </div>
          <a
            href="https://osamedic-records.b12sites.com/index#contact"
            target="_blank"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Get in touch
          </a>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            className="w-full max-w-xs"
            loading="lazy"
            alt=""
            src="/figure@2x.png"
          />
        </div>
      </div>
    </section>
  );
};

Section3.propTypes = {
  className: PropTypes.string,
};

export default Section3;
