import React, { useState } from "react";  
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import company from './assets/company.png';

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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState, // Corrected spread operator
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      alert("Registration Submitted Successfully!");

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
      navigate('/test-list', { state: { phone: formData.phone } });
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-4">
      <div className="bg-blue-200 shadow-lg rounded-lg w-full mt-20 max-w-3xl p-8">
        <div className="flex items-center justify-center mb-6">
          <img className='h-12 w-12 mr-3' alt="Company Logo" src={company} />
          <h2 className="text-2xl font-bold text-blue-700">Patient Registration for Testing</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-blue-700 font-medium mb-1">
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Enter your first name"
                className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-blue-700 font-medium mb-1">
                Last Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Enter your last name"
                className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Sex */}
          <div>
            <label htmlFor="sex" className="block text-blue-700 font-medium mb-1">
              Sex<span className="text-red-500">*</span>
            </label>
            <select
              id="sex"
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-blue-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dateOfBirth" className="block text-blue-700 font-medium mb-1">
              Date of Birth<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-blue-700 font-medium mb-1">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-blue-700 font-medium mb-1">
              Phone Number (WhatsApp Preferred)<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
              pattern="^\+?[1-9]\d{1,14}$"
              title="Please enter a valid phone number"
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Laboratory Investigation */}
          <div>
            <label htmlFor="testType" className="block text-blue-700 font-medium mb-1">
              Laboratory Investigation<span className="text-red-500">*</span>
            </label>
            <select
              id="testType"
              name="testType"
              value={formData.testType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-blue-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Test Type</option>
              {/* Add all your options here */}
              <option value="bloodTest">Blood Test</option>
              <option value="xray">X-Ray</option>
              <option value="covid19">COVID-19</option>
              {/* .. other options .. */}
              <option value="other">Other</option>
            </select>
          </div>

          {/* Home Service */}
          <div>
            <label htmlFor="homeService" className="block text-blue-700 font-medium mb-1">
              Do you require Home Service?<span className="text-red-500">*</span>
            </label>
            <select
              id="homeService"
              name="homeService"
              value={formData.homeService}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-blue-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          {/* Preferred Visit Time (Conditional) */}
          {formData.homeService === "Yes" && (
            <div>
              <label htmlFor="visitTime" className="block text-blue-700 font-medium mb-1">
                Preferred Visit Time<span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                id="visitTime"
                name="visitTime"
                value={formData.visitTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Mode of Payment */}
          <div>
            <label htmlFor="paymentMode" className="block text-blue-700 font-medium mb-1">
              Mode of Payment<span className="text-red-500">*</span>
            </label>
            <select
              id="paymentMode"
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-blue-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Payment Mode</option>
              <option value="card">Card</option>
              <option value="cash">Cash</option>
              <option value="bankTransfer">Bank Transfer</option>
            </select>
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
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
