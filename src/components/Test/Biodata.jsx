import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Biodata = ({ setPatientData, setTests }) => {  // Add props for passing the state up
  const navigate = useNavigate();
  const location = useLocation();
  const { patient } = location.state || {};

  useEffect(() => {
    if (!location.state) {
      navigate('/NotAvailablePage');
      return;
    }
  }, [location.state, navigate]);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const TwoId = (word = '') => {
    if (typeof word !== 'string') {
      return '';
    }
    return word.length < 2 ? word : word.substring(0, 2);
  };

  const initialPatientData = {
    patient_no: patient?.id || '',
    lab_no: '041219025',
    name: `${patient?.first_name || ''} ${patient?.last_name || ''}`,
    sex: patient?.sex || 'MALE',
    age: patient ? calculateAge(patient.dob) : '',
    ageUnit: 'Years',
    specimen: '',
    investigation: '',
    referredBy: '',
    time: '',
    date: new Date().toISOString().split('T')[0],
  };

  const initialTests = [
    { id: `${TwoId(patient?.test_type).toUpperCase()}`, name: `${patient?.test_type || ''}`, rate: 0, referenceRange: 'Normal', interpretation: 'Normal' },
  ];

  const [patientData, setLocalPatientData] = useState(initialPatientData);
  const [tests, setLocalTests] = useState(initialTests);

  // Sync with parent state
  useEffect(() => {
    setPatientData(patientData);
    setTests(tests);
  }, [patientData, tests, setPatientData, setTests]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLocalPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTestChange = (event) => {
    const { name, value } = event.target;
    setLocalTests([{ ...tests[0], [name]: value }]); // Assuming one test for simplicity
  };

  return (
    <div className='m-10'>
      <h3 className="text-3xl text-red-600 font-bold text-center mb-6">BIODATA</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-bold text-blue-600">Patient ID</label>
          <input
            type="text"
            className="w-full p-2 border border-blue-400 rounded-md shadow-lg"
            name="patient_no"
            value={patientData.patient_no}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-2 font-bold text-blue-600">Name Of Patient</label>
          <input
            type="text"
            className="w-full p-2 border border-blue-400 rounded-md shadow-lg"
            name="name"
            value={patientData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-2 font-bold text-blue-600">Lab. No.</label>
          <input
            type="text"
            className="w-full p-2 border border-blue-400 rounded-md shadow-lg"
            name="lab_no"
            value={patientData.lab_no}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-2 font-bold text-blue-600">Age</label>
          <input
            type="number"
            className="w-full p-2 border border-blue-400 rounded-md shadow-lg"
            name="age"
            value={patientData.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-2 font-bold text-blue-600">Sex</label>
          <select
            className="w-full p-2 border border-blue-400 rounded-md shadow-lg"
            name="sex"
            value={patientData.sex}
            onChange={handleChange}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 font-bold text-blue-600">Specimen</label>
          <input
            type="text"
            className="w-full p-2 border border-blue-400 rounded-md shadow-lg"
            name="specimen"
            value={patientData.specimen}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-2">
          <label className="block mb-2 font-bold text-blue-600">Investigations</label>
          <input
            type="text"
            className="w-full p-2 border border-blue-400 rounded-md shadow-lg"
            name="investigation"
            value={patientData.investigation}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-2 font-bold text-blue-600">Date Of Specimen Collection</label>
          <input
            type="date"
            className="w-full p-2 border border-blue-400 rounded-md shadow-lg"
            name="date"
            value={patientData.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-2 font-bold text-blue-600">Time</label>
          <input
            type="time"
            className="w-full p-2 border border-blue-400 rounded-md shadow-lg"
            name="time"
            value={patientData.time}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-2">
          <label className="block mb-2 font-bold text-blue-600">Referred By</label>
          <input
            type="text"
            className="w-full p-2 border border-blue-400 rounded-md shadow-lg"
            name="referredBy"
            value={patientData.referredBy}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

const handleSubmit = async (patientData, tests, setLoading) => {
  setLoading(true);
  try {
    console.log("Submitting:", patientData, tests); // Log to see the actual data being submitted

    if (!tests || tests.length === 0) {
      throw new Error("No tests provided. Please add at least one test.");
    }

    // Merge patientData into each test in the tests array
    const testsWithPatientData = tests.map(test => ({
      ...test,
      patient_id: patientData.patient_no,
      lab_no: patientData.lab_no,
      name: patientData.name,
      sex: patientData.sex,
      age: patientData.age,
      age_unit: patientData.ageUnit,
      time: patientData.time,
      specimen: patientData.specimen,
      referred_by: patientData.referredBy,
      date: patientData.date,
      investigation: patientData.investigation,
    }));

    const response = await axios.post('https://osamedic.vercel.app/printed-tests', {
      patientData,
      tests: testsWithPatientData, // Send the updated tests with patientData merged
    });

    console.log('Saved successfully:', response.data);
    alert('Test booking saved successfully!');
  } catch (error) {
    console.error('Error saving test booking:', error);
    if (error.response && error.response.status === 400) {
      alert(`Error: ${error.response.data}`);
    } else {
      alert('Failed to save test booking.');
    }
  } finally {
    setLoading(false);
  }
};


export { handleSubmit };
export default Biodata;
