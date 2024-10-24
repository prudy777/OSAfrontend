import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Patient = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`https://osamedic.vercel.app/patients/${id}`)
      .then(response => {
        setPatient(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch patient details:', error);
        setError('Failed to fetch patient details');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!patient) {
    return <div className="text-center text-red-500">Patient not found</div>;
  }

  return (
    <div className='flex  items-center text-black font-bold justify-center'>
      <div className="pt-20 bg-blue-100 border border-gray-200 shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <h2 className='text-2xl text-blue-500 font-semibold pt-20 mb-6'>Patient Details</h2>
        <table className='min-w-full table-auto'>
          <tbody>
            <tr className='border-b hover:bg-blue-200'>
              <td className='py-2 px-4 font-semibold text-gray-700'>ID</td>
              <td className='py-2 px-4'>{patient.id}</td>
            </tr>
            <tr className='border-b hover:bg-blue-200'>
              <td className='py-2 px-4 font-semibold text-gray-700'>First Name</td>
              <td className='py-2 px-4'>{patient.first_name}</td>
            </tr>
            <tr className='border-b hover:bg-blue-200'>
              <td className='py-2 px-4 font-semibold text-gray-700'>Last Name</td>
              <td className='py-2 px-4'>{patient.last_name}</td>
            </tr>
            <tr className='border-b hover:bg-blue-200'>
              <td className='py-2 px-4 font-semibold text-gray-700'>Date of Birth</td>
              <td className='py-2 px-4'>{patient.dob}</td>
            </tr>
            <tr className='border-b hover:bg-blue-200'>
              <td className='py-2 px-4 font-semibold text-gray-700'>Email</td>
              <td className='py-2 px-4'>{patient.email}</td>
            </tr>
            <tr className='border-b hover:bg-blue-200'>
              <td className='py-2 px-4 font-semibold text-gray-700'>Phone</td>
              <td className='py-2 px-4'>{patient.phone}</td>
            </tr>
            <tr className='border-b hover:bg-blue-200'>
              <td className='py-2 px-4 font-semibold text-gray-700'>Test Type</td>
              <td className='py-2 px-4'>{patient.test_type}</td>
            </tr>
            <tr className='hover:bg-blue-200'>
              <td className='py-2 px-4 font-semibold text-gray-700'>Status</td>
              <td className='py-2 px-4'>{patient.status}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patient;
