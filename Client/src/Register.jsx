import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import company from "./assets/company.png";
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaCreditCard } from "react-icons/fa";

const Register = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    testType: "",
    sex: "",
    homeService: "No",
    visitTime: "",
    paymentMode: "",
    testSubmissionTime: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Remove error message for the field
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  // Validate form data
  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid.";
    }
    if (!formData.testType) newErrors.testType = "Test type is required.";
    if (!formData.sex) newErrors.sex = "Sex is required.";
    if (!formData.paymentMode) newErrors.paymentMode = "Payment mode is required.";
    if (formData.homeService === "Yes" && !formData.visitTime) {
      newErrors.visitTime = "Preferred visit time is required.";
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!validate()) return;

    // Set the test submission time to the current date and time
    const submissionTime = new Date().toLocaleString();

    try {
      await axios.post("http://localhost:4000/register", {
        first_name: formData.firstName,
        last_name: formData.lastName,
        dob: formData.dateOfBirth,
        email: formData.email,
        phone: formData.phone,
        test_type: formData.testType,
        sex: formData.sex,
        home_service: formData.homeService,
        visit_time: formData.homeService === "Yes" ? formData.visitTime : null,
        payment_mode: formData.paymentMode,
        test_submission_time: submissionTime,
      });

      // Success feedback
      alert("Registration submitted successfully!");

      // Reset the form data
      setFormData({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        email: "",
        phone: "",
        testType: "",
        sex: "",
        homeService: "No",
        visitTime: "",
        paymentMode: "",
        testSubmissionTime: "",
      });

      // Trigger the callback if provided
      if (onRegisterSuccess) {
        onRegisterSuccess();
      }

      // Navigate to the TestList page and pass the phone number as state
      navigate("/test-list", { state: { phone: formData.phone } });
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-4">
      <div className="bg-white mt-20 shadow-xl rounded-lg w-full max-w-4xl p-8">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <img className="h-12 w-12 mr-3" alt="Company Logo" src={company} />
          <h2 className="text-3xl font-bold text-blue-700">Patient Registration</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-blue-700 font-medium mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your first name"
                  className={`pl-10 w-full px-4 py-2 border ${
                    errors.firstName ? "border-red-500" : "border-blue-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-blue-700 font-medium mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your last name"
                  className={`pl-10 w-full px-4 py-2 border ${
                    errors.lastName ? "border-red-500" : "border-blue-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Sex and Date of Birth */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sex */}
            <div>
              <label htmlFor="sex" className="block text-blue-700 font-medium mb-1">
                Sex <span className="text-red-500">*</span>
              </label>
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border ${
                  errors.sex ? "border-red-500" : "border-blue-300"
                } bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select Sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.sex && <p className="text-red-500 text-sm mt-1">{errors.sex}</p>}
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="block text-blue-700 font-medium mb-1">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className={`pl-10 w-full px-4 py-2 border ${
                    errors.dateOfBirth ? "border-red-500" : "border-blue-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-blue-700 font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                  className={`pl-10 w-full px-4 py-2 border ${
                    errors.email ? "border-red-500" : "border-blue-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-blue-700 font-medium mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+1234567890"
                  pattern="^\+?[1-9]\d{1,14}$"
                  title="Please enter a valid phone number"
                  className={`pl-10 w-full px-4 py-2 border ${
                    errors.phone ? "border-red-500" : "border-blue-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Laboratory Investigation */}
          <div>
            <label htmlFor="testType" className="block text-blue-700 font-medium mb-1">
              Laboratory Investigation <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                id="testType"
                name="testType"
                value={formData.testType}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border ${
                  errors.testType ? "border-red-500" : "border-blue-300"
                } bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select Test Type</option>
                <option value="bloodTest">Blood Test</option>
                <option value="xray">X-Ray</option>
                <option value="covid19">COVID-19</option>
                <option value="urineTest">Urine Test</option>
                <option value="covidAntibody">COVID Antibody</option>
                <option value="other">Other</option>
              </select>
            </div>
            {errors.testType && <p className="text-red-500 text-sm mt-1">{errors.testType}</p>}
          </div>

          {/* Home Service */}
          <div>
            <label htmlFor="homeService" className="block text-blue-700 font-medium mb-1">
              Do you require Home Service? <span className="text-red-500">*</span>
            </label>
            <select
              id="homeService"
              name="homeService"
              value={formData.homeService}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border ${
                errors.homeService ? "border-red-500" : "border-blue-300"
              } bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
            {errors.homeService && <p className="text-red-500 text-sm mt-1">{errors.homeService}</p>}
          </div>

          {/* Preferred Visit Time (Conditional) */}
          {formData.homeService === "Yes" && (
            <div>
              <label htmlFor="visitTime" className="block text-blue-700 font-medium mb-1">
                Preferred Visit Time <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="datetime-local"
                  id="visitTime"
                  name="visitTime"
                  value={formData.visitTime}
                  onChange={handleChange}
                  required
                  className={`pl-10 w-full px-4 py-2 border ${
                    errors.visitTime ? "border-red-500" : "border-blue-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              {errors.visitTime && <p className="text-red-500 text-sm mt-1">{errors.visitTime}</p>}
            </div>
          )}

          {/* Mode of Payment */}
          <div>
            <label htmlFor="paymentMode" className="block text-blue-700 font-medium mb-1">
              Mode of Payment <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                id="paymentMode"
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border ${
                  errors.paymentMode ? "border-red-500" : "border-blue-300"
                } bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select Payment Mode</option>
                <option value="card">Card</option>
                <option value="cash">Cash</option>
                <option value="bankTransfer">Bank Transfer</option>
              </select>
            </div>
            {errors.paymentMode && <p className="text-red-500 text-sm mt-1">{errors.paymentMode}</p>}
          </div>

          {/* Date and Time of Test Submission */}
          <div>
            <label htmlFor="testSubmissionTime" className="block text-blue-700 font-medium mb-1">
              Date and Time of Test Submission
            </label>
            <input
              type="text"
              id="testSubmissionTime"
              name="testSubmissionTime"
              value={formData.testSubmissionTime || new Date().toLocaleString()}
              readOnly
              disabled
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 flex items-center justify-center"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
