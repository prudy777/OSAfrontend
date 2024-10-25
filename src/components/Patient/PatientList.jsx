import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PatientList = ({ refresh }) => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  const fetchPatients = async () => {
    try {
      const response = await axios.get('https://osamedic.onrender.com/patients');
      setPatients(response.data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch patients. Please try again.');
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [refresh]);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`https://osamedic.onrender.com/patients/${id}/status`, { status });
      setPatients(prevPatients => prevPatients.map(patient =>
        patient.id === id ? { ...patient, status } : patient
      ));
      alert(`Patient status updated to ${status} successfully!`);
      if (status === 'accepted') {
        navigate(`/patient/${id}`);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to update patient status.');
    }
  };

  const handlePaymentStatusChange = async (id, paymentStatus) => {
    try {
      await axios.put(`https://osamedic.onrender.com/patients/${id}/payment-status`, { paymentStatus });
      setPatients(prevPatients => prevPatients.map(patient =>
        patient.id === id ? { ...patient, payment_status: paymentStatus } : patient
      ));
      alert(`Payment status updated to ${paymentStatus} successfully!`);
    } catch (error) {
      console.error(error);
      alert('Failed to update payment status.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://osamedic.onrender.com/patients/${id}`);
      setPatients(prevPatients => prevPatients.filter(patient => patient.id !== id));
      alert('Patient declined and deleted successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to delete patient.');
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Accept Test</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">First Name</th>
              <th className="py-3 px-6">Last Name</th>
              <th className="py-3 px-6">Date of Birth</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Phone</th>
              <th className="py-3 px-6">Test Type</th>
              <th className="py-3 px-6">Sex</th>
              <th className="py-3 px-6">Home Service</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Payment Status</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? (
              patients.map(patient => (
                <tr key={patient.id} className="hover:bg-gray-100 transition-all">
                  <td className="py-3 px-6 text-gray-800">{patient.id}</td>
                  <td className="py-3 px-6 text-gray-800">{patient.first_name}</td>
                  <td className="py-3 px-6 text-gray-800">{patient.last_name}</td>
                  <td className="py-3 px-6 text-gray-800">{patient.dob}</td>
                  <td className="py-3 px-6 text-gray-800">{patient.email}</td>
                  <td className="py-3 px-6 text-gray-800">{patient.phone}</td>
                  <td className="py-3 px-6 text-gray-800">{patient.test_type}</td>
                  <td className="py-3 px-6 text-gray-800">{patient.sex}</td>
                  <td className="py-3 px-6 text-gray-800">{patient.home_service === 'Yes' ? 'Yes' : 'No'}</td>
                  <td className={`py-3 px-6 font-semibold ${patient.status === 'accepted' ? 'text-green-500' : 'text-yellow-500'}`}>
                    {patient.status}
                  </td>
                  <td className={`py-3 px-6 ${patient.payment_status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}>
                    {patient.payment_status || 'Expecting Payment'}
                  </td>
                  <td className="py-3 px-6 space-y-2">
                    <button
                      className="bg-green-500 text-white px-4 py-2 m-5 rounded hover:bg-green-600 transition-all"
                      onClick={() => handleStatusChange(patient.id, 'accepted')}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 m-5 py-2 rounded hover:bg-red-600 transition-all"
                      onClick={() => handleDelete(patient.id)}
                    >
                      Decline
                    </button>
                    <div className="space-x-2 flex flex-row">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-all"
                        onClick={() => handlePaymentStatusChange(patient.id, 'Completed')}
                      >
                        Completed
                      </button>
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition-all"
                        onClick={() => handlePaymentStatusChange(patient.id, 'Partial')}
                      >
                        Partial
                      </button>
                      <button
                        className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 transition-all"
                        onClick={() => handlePaymentStatusChange(patient.id, 'Expecting Payment')}
                      >
                        Expecting
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="py-4 text-center text-gray-500">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;
