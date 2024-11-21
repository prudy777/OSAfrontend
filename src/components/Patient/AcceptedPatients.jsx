import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const AcceptedPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://osamedic.onrender.com/accepted-patients')
      .then(response => {
        setPatients(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch accepted patients:', error);
        setError('Failed to fetch accepted patients');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-xl text-red-600">{error}</div>;
  }

  const handleRowClick = (patient) => {
    navigate('/test-booking', { state: { patient } });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className='text-4xl font-bold mt-20 text-center mb-8 text-gray-800'>Accepted Patients</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white shadow-lg rounded-lg border border-gray-200">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-6">Patient No</th>
              <th className="py-3 px-6">First Name</th>
              <th className="py-3 px-6">Last Name</th>
              <th className="py-3 px-6">Date of Birth</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Phone</th>
              <th className="py-3 px-6">Test Type</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr 
                key={patient.patient_no} 
                onClick={() => handleRowClick(patient)} 
                className="cursor-pointer hover:bg-blue-100 transition-all border-b"
              >
                <td className="py-3 px-6 text-green-600">{patient.patient_no}</td>
                <td className="py-3 px-6">{patient.first_name}</td>
                <td className="py-3 px-6">{patient.last_name}</td>
                <td className="py-3 px-6">{format(new Date(patient.dob), 'MM/dd/yyyy')}</td> {/* Formatted DOB */}
                <td className="py-3 px-6">{patient.email}</td>
                <td className="py-3 px-6">{patient.phone}</td>
                <td className="py-3 px-6">{patient.test_type}</td>
                <td className={`py-3 px-6 font-semibold ${patient.status === 'Pending' ? 'text-yellow-500' : 'text-green-500'}`}>
                  {patient.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcceptedPatients;
