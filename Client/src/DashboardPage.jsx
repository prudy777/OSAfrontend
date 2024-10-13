import React from "react";
import companyLogo from './assets/company.png'; 
import ceoImage from './assets/Emmanuel.png'; 
import wifeImage from './assets/progress.png';

function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-1">
        <section className="hero-section bg-blue-400 text-white py-16">
          <div className="container mx-auto px-4 md:flex md:items-center md:space-x-12">
            <div className="md:w-1/2">
            <header className="justify-center flex item-center">
        <div className="container mx-auto py-4 flex justify-between items-center">
          <div className="flex flex-col items-center space-x-3">
          <a href="/"><img src={companyLogo} alt="Company Logo" className=" hidden md:inline w-15 h-15" /></a>
            <div className="mt-4 md:mt-4 flex flex-col text-center">
        <h1 className="text-black font-bold text-5xl md:text-6xl">Osamedic Lab</h1>
        <span className="text-blue-500  font-bold text-lg md:text-2xl">VER. 1.0.0</span>
        </div>
          </div>
        </div>
      </header>

              <h1 className="text-4xl text-black font-bold mb-4">Hi there!</h1>
              <p className="text-lg text-black mb-6">
                Fuelled by a passion for designing compelling products, I have a desire to excel and continuously improve in my work. Learn more about my journey below.
              </p>
              <a href="https://cdn.prod.website-files.com/5fa25266badbdb239c79ef86/66a1a30a81f0e58483d9a8a4_Sebastian%20Petravic%20CV%202024.pdf" className="bg-white font-bold px-6 py-3 rounded-lg text-black font-semibold hover:from-blue-200 hover:to-blue-600 transition">
                View my CV
              </a>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-10">
              <img src={ceoImage} alt="Profile" className="rounded-lg bg-white h-30 p-20 border-2 border-white w-full rounded-lg" />
            </div>
          </div>
        </section>

        <section className="career-journey-section py-16 bg-blue-200">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold justify-center flex item-center text-gray-800 mb-6">My career journey</h2>
            <p className="text-black flex justify-center items-center p-5 font-semibold leading-relaxed mb-8">
              Always up for a challenge, I have worked across a range of lean startups and larger companies...
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["UI Design", "UX Design", "Prototyping", "Branding", "HTML/CSS", "Wireframing", "Information Architecture", "User Research", "User Interviews", "Leadership", "Figma"].map(skill => (
                <div key={skill} className="bg-blue-400 text-black font-bold flex flex-col items-center p-4 shadow-lg rounded-lg hover:bg-white transition-all transform hover:scale-105">
                  <span className="text-gray-800 font-semibold">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="testimonials-section py-16 bg-gray-100">
          <div className="container p-10 bg-blue-200 font-semibold mx-auto px-4">
            <h2 className="text-3xl font-bold justify-center flex item-center text-gray-800 mb-6">On working with me</h2>
            <blockquote className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-700 mb-4">
                "Sebastian is a guru at all things UX design, consistently producing intuitive, modern, and bold designs..."
              </p>
              <div className="flex items-center space-x-4">
                <img src={wifeImage} alt="Progress Osawemen" className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h5 className="font-semibold text-gray-800">Progress Osawemen</h5>
                  <span className="text-sm text-gray-600">Managing Director at Osamedic</span>
                </div>
              </div>
            </blockquote>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>Copyright © 2024 OSAMEDIC Diagnostic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default DashboardPage;
