import React from "react";
import companyLogo from './assets/company.png';
import ceoImage from './assets/Emmanuel.png'; 
import wifeImage from './assets/progress.png'; 
import { FaCheckCircle } from 'react-icons/fa';

const About = () => {
  return (
    <section className="py-16 bg-gradient-to-r p-5 from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <Header />
        {/* Description Section */}
        <Description />
        {/* Services and Values Sections */}
        <div className="grid gap-8 m-20 justify-center items-center md:grid-cols-2 mt-12">
          <ServiceCard />
          <ValuesCard />
        </div> 
        {/* TeamCard Section */}
        <TeamCard ceoImage={ceoImage} wifeImage={wifeImage} />
      </div>
    </section>
  );
};

export default About;

/* ------------------ Header Component ------------------ */

const Header = () => (
  <div className="text-center mb-12">
    <img
      src={companyLogo}
      alt="Company Logo"
      className="mx-auto mb-4 w-24 h-auto"
    />
    <h1 className="text-5xl font-extrabold text-blue-700">About Us</h1>
  </div>
);

/* ------------------ Description Component ------------------ */

const Description = () => (
  <div className="bg-white shadow-lg rounded-xl p-8 mb-12">
    <p className="text-gray-800 font-medium italic p-10">
      Osamedic Diagnostics Ltd was established to bridge the gap between the public and access to quality, affordable healthcare in Nigeria. We offer onsite and mobile diagnostic services in Lekki and its environs, sale of medical laboratory equipment and consumables, laboratory setup, registration, management, and consultancy services. Our expertise extends to designing medical structures, selecting appropriate equipment, and optimizing budget allocations for any given project.
    </p>
  </div>
);

/* ------------------ ServiceCard Component ------------------ */

const ServiceCard = () => {
  const services = [
    "Onsite Diagnostic Services",
    "Mobile Diagnostic Services",
    "Sale of Medical Laboratory Equipment",
    "Sale of Medical Consumables",
    "Laboratory Setup, Registration, and Management",
    "Consultancy Services"
  ];

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6">
      <h3 className="text-2xl font-semibold text-blue-700 mb-4">Our Services</h3>
      <ul className="space-y-4">
        {services.map((service, index) => (
          <li key={index} className="flex items-start text-blue-600">
            <FaCheckCircle className="h-6 w-6 text-blue-500 mt-1 mr-3" />
            <span className="text-base">{service}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ------------------ TeamCard Component ------------------ */

const TeamCard = ({ ceoImage, wifeImage }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6">
    <h3 className="text-2xl font-semibold text-center text-blue-700 mb-4">Our Team</h3>
    <div className="flex flex-col md:flex-row justify-center items-center">
      {/* CEO Section */}
      <div className="flex items-center mb-6 md:mb-0 md:mr-8">
        <img
          src={ceoImage}
          alt="CEO Emmanuel Osawemen"
          className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
        />
        <div className="ml-4">
          <h4 className="text-xl font-medium text-blue-700">Mr. Emmanuel Osawemen</h4>
          <p className="text-blue-500">CEO</p>
        </div>
      </div>
      {/* Co-Founder Section */}
      <div className="flex items-center">
        <img
          src={wifeImage}
          alt="Co-Founder Progress Osawemen"
          className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
        />
        <div className="ml-4">
          <h4 className="text-xl font-medium text-blue-700">Mrs. Progress Osawemen</h4>
          <p className="text-blue-500">Co-Founder</p>
        </div>
      </div>
    </div>
    <p className="mt-6 text-gray-800 font-medium">
      The driving force behind Osamedic Diagnostics are Mr. Emmanuel Osawemen and Mrs. Progress Osawemen, both qualified Medical Laboratory Scientists with over a decade of experience, supported by a dedicated team. We collaborate with local and international distributors to ensure top-notch service and quality.
    </p>
  </div>
);

/* ------------------ ValuesCard Component ------------------ */

const ValuesCard = () => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6">
    <h3 className="text-2xl font-semibold text-blue-700 mb-4">Our Values</h3>
    <p className="text-gray-800 font-medium">
      We are committed to upholding the highest professional and ethical standards in all our business engagements. Integrity, excellence, and customer satisfaction are at the core of everything we do.
    </p>
  </div>
);
