import React from "react";
import { Link } from "react-router-dom";
import companyLogo from './assets/company.png';
import ceoImage from './assets/Emmanuel.png';
import wifeImage from './assets/progress.png';
import { FaDownload, FaCheckCircle } from 'react-icons/fa';

function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <main className="flex-1 px-6 md:px-12 lg:px-24 py-10">
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
    <section className="bg-white p-20 rounded-2xl shadow-lg mb-12 overflow-hidden">
      <div className="container  mx-auto flex flex-col md:flex-row items-center py-10 px-6 md:px-12">
        {/* Left Content */}
        <div className="md:w-1/2 mt-20">
          <Header companyLogo={companyLogo} />

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Welcome!</h1>
          <p className="text-lg text-gray-600 mb-6">
            Passionate about creating intuitive and innovative products, I’m always learning and growing. Explore my journey below.
          </p>
          <Link
            to="/path-to-cv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            <FaDownload className="mr-2" />
            View my CV
          </Link>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <img
            src={ceoImage}
            alt="Profile"
            className="rounded-full shadow-lg w-72 h-72 object-cover border-4 border-blue-100 hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
};

/* ------------------ Header Component ------------------ */

const Header = ({ companyLogo }) => (
  <div className="flex items-center mb-6">
    <Link to="/">
      <img 
        src={companyLogo} 
        alt="Company Logo" 
        className="w-14 h-14 object-contain"
      />
    </Link>
    <div className="ml-4">
      <h2 className="text-2xl font-bold text-gray-800">Osamedic Lab</h2>
      <span className="text-blue-600 font-medium">VER. 1.0.0</span>
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
    <section className="py-16 bg-gradient-to-r from-blue-100 via-blue-50 to-white rounded-2xl shadow-inner mb-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Career Journey</h2>
        <p className="text-center text-lg text-gray-600 mb-12 px-6">
          A creative problem-solver with a passion for impactful design, I've worked with startups and large enterprises alike, pushing the boundaries of user experience.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
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
  <div className="hover:bg-blue-600 text-blue-600 hover:text-white font-semibold flex flex-col items-center p-6 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105">
    <FaCheckCircle className="h-6 w-6 mb-2" />
    <span className="text-center text-base">{skill}</span>
  </div>
);

/* ------------------ TestimonialsSection Component ------------------ */

const TestimonialsSection = ({ wifeImage }) => (
  <section className="py-16 bg-white rounded-2xl shadow-lg">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Testimonials</h2>
      <div className="flex justify-center">
        <blockquote className="bg-gray-100 p-8 rounded-xl shadow-md max-w-xl">
          <p className="text-gray-700 text-lg italic mb-6">
            "Sebastian is a genius at crafting intuitive, modern UX designs that enhance our projects tremendously."
          </p>
          <div className="flex items-center">
            <img 
              src={wifeImage} 
              alt="Progress Osawemen" 
              className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-blue-500"
            />
            <div>
              <h5 className="font-bold text-gray-800">Progress Osawemen</h5>
              <span className="text-gray-600">Managing Director, Osamedic</span>
            </div>
          </div>
        </blockquote>
      </div>
    </div>
  </section>
);

/* ------------------ Footer Component ------------------ */

const Footer = () => (
  <footer className="bg-gray-800 text-white py-6">
    <div className="container mx-auto text-center">
      <p className="text-sm">&copy; {new Date().getFullYear()} OSAMEDIC Diagnostics. All rights reserved.</p>
    </div>
  </footer>
);
