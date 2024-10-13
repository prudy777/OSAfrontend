import PropTypes from "prop-types";

const FrameComponent = ({
  className = "",
  emailAddress,
  containerPlaceholder,
}) => {
  return (
    <div className={`p-4 border rounded-lg ${className}`}>
      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold mb-2">
          <div className="flex items-center">
            <span>{emailAddress}</span>
            <span className="text-red-500 ml-1">*</span>
          </div>
        </label>
        <div className="w-full">
          <input
            className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={containerPlaceholder}
            type="text"
          />
        </div>
      </div>
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
  emailAddress: PropTypes.string,
  containerPlaceholder: PropTypes.string,
};

export default FrameComponent;
