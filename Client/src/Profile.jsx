import React from "react";
import companyLogo from './assets/company.png';
import ceoImage from './assets/Emmanuel.png'; 
import wifeImage from './assets/progress.png'; 

const About = () => {
  return (
    <section className="py-12 mt-48 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <img
            src={companyLogo}
            alt="Company Logo"
            className="mx-auto mb-4 w-48 h-auto"
          />
          <h1 className="text-4xl font-bold text-blue-700">About Us</h1>
        </div>

        {/* Description Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-12">
          <p className="text-lg text-blue-600 font-semibold italic">
            Osamedic Diagnostics Ltd was born out of the need to bridge the gap between the public and access to quality and affordable healthcare in Nigeria. We currently offer onsite and mobile diagnostic services to the residents of Lekki and its environs, Sale of Medical laboratory Equipment and Consumables, Laboratory Set-up, Registration, and Management. We also offer consultancy services as regards the kind of medical structures, designs, and building, environment that best suits a medical centre, the right equipment and budget allocations for any given projects.
          </p>
        </div>

        {/* Services, Team, and Values Sections */}
        <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          
          {/* Our Services */}
          <div className="bg-blue-100 p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <h4 className="text-2xl font-semibold text-blue-700 mb-4">Our Services</h4>
            <ul className="space-y-3">
              {[
                "Onsite Diagnostic Services",
                "Mobile Diagnostic Services",
                "Sale of Medical Laboratory Equipment",
                "Sale of Medical Consumables",
                "Laboratory Setup, Registration, and Management",
                "Consultancy Services"
              ].map((service, index) => (
                <li key={index} className="flex items-center text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.97 4.97a.75.75 0 011.07 1.05l-3.99 4.99a.75.75 0 01-1.08.02L2.324 8.384a.75.75 0 111.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 001.079-.02l3.992-4.99a.75.75 0 00-1.091-1.028L9.477 9.417l-.485-.486z" />
                  </svg>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Team */}
          <div className="bg-blue-100 p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <h4 className="text-2xl font-semibold text-blue-700 mb-4">Our Team</h4>
            <div className="mb-6">
              <div className="flex items-center">
                <img
                  src={ceoImage}
                  alt="CEO"
                  className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
                />
                <div className="ml-4">
                  <h5 className="text-xl font-medium text-blue-700">Mr. Emmanuel Osawemen</h5>
                  <p className="text-blue-500">CEO</p>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-center">
                <img
                  src={wifeImage}
                  alt="Co-Founder"
                  className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
                />
                <div className="ml-4">
                  <h5 className="text-xl font-medium text-blue-700">Mrs. Progress Osawemen</h5>
                  <p className="text-blue-500">Co-Founder</p>
                </div>
              </div>
            </div>
            <p className="text-lg text-blue-600 font-semibold italic">
              The major drivers of Osamedic Diagnostics are Mr. Emmanuel Osawemen and his wife, Mrs. Progress Osawemen, both qualified Medical Laboratory Scientists with over 10 years of post-qualification practice in the medical field, as well as a team of medical advisors. We partner with distributors, dealers, and manufacturers' representatives locally and internationally.
            </p>
          </div>

          {/* Our Values */}
          <div className="bg-blue-100 p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <h4 className="text-2xl font-semibold text-blue-700 mb-4">Our Values</h4>
            <p className="text-lg text-blue-600 font-semibold italic">
              We are committed to best and professional good ethical practices in all of our business engagements and relationships.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
