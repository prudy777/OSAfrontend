import Section1 from "./components/Section1.jsx";
import Section2 from "./components/Section2.jsx";
import Section3 from "./components/Section3.jsx";
import Section4 from "./components/Section4.jsx";
import Section5 from "./components/Section5.jsx";
import Section6 from "./components/Section6.jsx";

const OsamedicRecordsb12sitescom = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      
      <section className="w-full flex flex-col items-center">
        
        <header className="w-full py-4 bg-white shadow-md">
          <h1>hello</h1>
          </header>
        
        {/* Section 1 and 2 container */}
        <div className="w-full mt-20 max-w-7xl mx-auto px-4">
          <Section1 />
          <Section2 />
        </div>
      </section>

      {/* Section 3, 4, 5, 6 */}
      <div className="w-full max-w-7xl mx-auto px-4 space-y-8">
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
      </div>
    </div>
  );
};

export default OsamedicRecordsb12sitescom;
