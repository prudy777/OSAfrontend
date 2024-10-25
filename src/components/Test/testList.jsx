import React, { useRef, useState, Suspense } from 'react';
import HaematologyTable from './HaematologyTable';
import Biodata from './Biodata';
import Serology from './Serology';
import Overall from './Overall';
import Typhoid from './Typhoid';
import Ref from './Ref';
import Parasitology from './Parasitology';
import Comment from './Comment';
import Medical from './Medical';
import Chemical from './Chemical';
import Report from './Report';
import html2pdf from 'html2pdf.js';
import { handleSubmit } from './Biodata'; // Importing handleSubmit from Biodata.js

const components = [
  { name: 'Medical', loader: () => import('./Medical') },
  { name: 'Chemical', loader: () => import('./Chemical') },
  { name: 'Serology', loader: () => import('./Serology') },
  { name: 'Typhoid', loader: () => import('./Typhoid') },
  { name: 'Parasitology', loader: () => import('./Parasitology') },
  { name: 'HaematologyTable', loader: () => import('./HaematologyTable') },
  { name: 'Overall', loader: () => import('./Overall') },
];

const TestList = () => {
  const [addedComponents, setAddedComponents] = useState([]);  // Track added components
  const [loading, setLoading] = useState(false); // Loading state
  const [patientData, setPatientData] = useState({}); // Define patientData
  const [tests, setTests] = useState([]); // Define tests state

  const loadNextComponent = () => {
    const nextComponent = components.find(
      (comp) => !addedComponents.some((addedComp) => addedComp.name === comp.name)
    );

    if (nextComponent) {
      nextComponent.loader().then((module) => {
        setAddedComponents((prevComponents) => [
          ...prevComponents,
          { name: nextComponent.name, Component: module.default }
        ]);
      });
    }
  };

  const contentRef = useRef(null);  // Reference the content div

  const generatePdfBlob = () => {
    return new Promise((resolve, reject) => {
      const element = contentRef.current;

      const options = {
        margin: 0.5,
        filename: 'Laboratory_Investigation_Report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      html2pdf().from(element).set(options).outputPdf('blob')
        .then((pdfBlob) => resolve(pdfBlob))
        .catch((error) => reject(error));
    });
  };

  const handleSavePdf = () => {
    const element = contentRef.current;

    const options = {
      margin: 0.5,
      filename: 'Laboratory_Investigation_Report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(options).save();  // Converting to PDF and saving
  };

  const handleSendWhatsApp = async () => {
    try {
      const pdfBlob = await generatePdfBlob();

      const pdfUrl = URL.createObjectURL(pdfBlob);
      const whatsappMessage = `Hi, please find the attached Laboratory Investigation Report: ${pdfUrl}`;
      const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;

      window.open(whatsappLink, '_blank');
    } catch (error) {
      console.error('Error generating PDF for WhatsApp:', error);
    }
  };

  const submitTest = () => {
    // Make sure you pass patientData, tests, and setLoading to handleSubmit
    handleSubmit(patientData, tests, setLoading); 
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl mt-20 text-center pt-20 pl-10 md:text-3xl text-blue-600 font-bold">
          LABORATORY INVESTIGATION REPORT
        </h2>
      </div>

      <div id='pdf-content' ref={contentRef}>
        {/* Pass setPatientData and setTests to Biodata so it can update them */}
        <Biodata setPatientData={setPatientData} setTests={setTests} />
        
        {addedComponents.map((comp, index) => (
          <Suspense fallback={<div>Loading...</div>} key={comp.name}>
            <comp.Component />
          </Suspense>
        ))}
        <Ref/>
        <Comment/>
        <Report/>
      </div>

      <div className='flex flex-col md:flex-row items-center justify-center'>
        <button
          className="w-96 m-10 bg-blue-400 text-white py-2 rounded-md hover:bg-blue-700"
          onClick={handleSavePdf}
        >
          SAVE AS PDF
        </button>
        <button
          className="w-96 bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
          onClick={handleSendWhatsApp}
        >
          SEND TO WHATSAPP
        </button>
        <button
          className="bg-white shadow-lg text-blue-600 border-2 border-blue-400 hover:text-black font-bold py-2 px-10 mx-3 rounded-md hover:bg-blue-700 m-5"
          onClick={loadNextComponent}
        >
          Add Test
        </button>
        <button onClick={submitTest} disabled={loading} className="mt-4 p-2 bg-blue-600 text-white rounded-md shadow-lg">
        {loading ? 'Submitting...' : 'Submit Tests'}
      </button>
      </div>
    </>
  );
};

export default TestList;
