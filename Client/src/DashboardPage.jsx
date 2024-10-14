import React from "react";
import { Link } from "react-router-dom";
import companyLogo from './assets/company.png'; 
import ceoImage from './assets/Emmanuel.png'; 
import wifeImage from './assets/progress.png';
import { FaDownload, FaCheckCircle } from 'react-icons/fa';

function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 px-4 md:px-8 lg:px-16 py-8">
        {/* Hero Section */}
        <HeroSection 
          companyLogo={companyLogo}
          ceoImage={ceoImage}
        />

        {/* Career Journey Section */}
        <CareerJourneySection />

        {/* Testimonials Section */}
        <TestimonialsSection 
          wifeImage={wifeImage}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default DashboardPage;

/* ------------------ HeroSection Component ------------------ */

const HeroSection = ({ companyLogo, ceoImage }) => {
  return (
    <section className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        {/* Left Content */}
        <div className="md:w-1/2 p-6">
          {/* Header */}
          <Header companyLogo={companyLogo} />
          
          {/* Welcome Text */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">Hi there!</h1>
          <p className="text-base md:text-lg text-gray-600 mb-6">
            Fuelled by a passion for designing compelling products, I strive to excel and continuously improve in my work. Learn more about my journey below.
          </p>
          <Link 
            to="/path-to-cv" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors duration-300"
          >
            <FaDownload className="mr-2" />
            View my CV
          </Link>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 p-6 flex justify-center">
          <img 
            src={ceoImage} 
            alt="Profile" 
            className="rounded-lg shadow-lg max-w-xs md:max-w-sm w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};

/* ------------------ Header Component ------------------ */

const Header = ({ companyLogo }) => (
  <div className="flex items-center mb-4">
    <Link to="/">
      <img 
        src={companyLogo} 
        alt="Company Logo" 
        className="w-12 h-12 md:w-16 md:h-16 object-contain"
      />
    </Link>
    <div className="ml-3">
      <h2 className="text-xl md:text-2xl font-bold text-gray-700">Osamedic Lab</h2>
      <span className="text-blue-500 font-medium text-sm md:text-base">VER. 1.0.0</span>
    </div>
  </div>
);

/* ------------------ CareerJourneySection Component ------------------ */

const CareerJourneySection = () => {
  const skills = [
    "UI Design", "UX Design", "Prototyping", "Branding", 
    "HTML/CSS", "Wireframing", "Information Architecture", 
    "User Research", "User Interviews", "Leadership", "Figma"
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-inner mb-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-4">My Career Journey</h2>
        <p className="text-sm md:text-base text-gray-600 text-center mb-8 px-4">
          Always up for a challenge, I have worked across a range of lean startups and larger companies, honing my skills and contributing to impactful projects that drive innovation and user satisfaction.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------ SkillCard Component ------------------ */

const SkillCard = ({ skill }) => (
  <div className="hover:bg-blue-600 text-blue-600 hover:text-white font-medium flex flex-col items-center p-5 rounded-lg shadow-md bg-white transition-transform transform hover:scale-105">
    <FaCheckCircle className="h-6 w-6 mb-2" />
    <span className="text-center text-sm">{skill}</span>
  </div>
);

/* ------------------ TestimonialsSection Component ------------------ */

const TestimonialsSection = ({ wifeImage }) => (
  <section className="py-16 bg-white rounded-xl shadow-md">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">On Working with Me</h2>
      <div className="flex justify-center">
        <blockquote className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-2xl">
          <p className="text-gray-700 mb-6 italic">
            "Sebastian is a guru at all things UX design, consistently producing intuitive, modern, and bold designs that elevate our projects."
          </p>
          <div className="flex items-center">
            <img 
              src={wifeImage} 
              alt="Progress Osawemen" 
              className="w-10 h-10 rounded-full object-cover mr-4 border-2 border-blue-500"
            />
            <div>
              <h5 className="font-semibold text-gray-800">Progress Osawemen</h5>
              <span className="text-sm text-gray-600">Managing Director at Osamedic</span>
            </div>
          </div>
        </blockquote>
      </div>
    </div>
  </section>
);

/* ------------------ Footer Component ------------------ */

const Footer = () => (
  <footer className="bg-gray-800 text-white py-4">
    <div className="container mx-auto text-center">
      <p className="text-sm">&copy; {new Date().getFullYear()} OSAMEDIC Diagnostic. All rights reserved.</p>
    </div>
  </footer>
);
