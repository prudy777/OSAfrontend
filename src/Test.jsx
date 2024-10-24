import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const TestBookingsList = () => {
  const [testBookings, setTestBookings] = useState([]);
  const [selectedBookings, setSelectedBookings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAllSelected, setIsAllSelected] = useState(false);

  // Fetch test bookings on component mount
  useEffect(() => {
    const fetchTestBookings = async () => {
      try {
        const response = await axios.get('https://osamedic.vercel.app/test-bookings');
        if (response.data && Array.isArray(response.data)) {
          setTestBookings(response.data);
        }
      } catch (err) {
        setError('Failed to fetch test bookings');
      } finally {
        setLoading(false);
      }
    };
    fetchTestBookings();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedBookings((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelectAll = () => {
    const newSelection = {};
    if (!isAllSelected) {
      testBookings.forEach((booking) => {
        newSelection[booking.test_id] = true;
      });
    }
    setSelectedBookings(newSelection);
    setIsAllSelected(!isAllSelected);
  };

  const handleDeleteSelected = async () => {
    const selectedIds = Object.keys(selectedBookings).filter((id) => selectedBookings[id]);
    
    if (!selectedIds.length) {
      alert('No bookings selected for deletion.');
      return;
    }
  
    try {
      // Assuming your backend API expects the selected IDs in the request body
      await axios.post('https://osamedic.vercel.app/test-bookings/delete', { ids: selectedIds });
      
      // Update the testBookings state to remove the deleted records
      setTestBookings((prev) =>
        prev.filter((booking) => !selectedIds.includes(String(booking.test_id)))
      );
      
      // Clear the selected bookings state after deletion
      setSelectedBookings({});
      
      alert('Selected bookings deleted successfully.');
    } catch (err) {
      console.error('Error deleting selected bookings:', err);
      alert('Failed to delete selected bookings.');
    }
  };

  const handlePrint = () => {
    const doc = new jsPDF();

    // Add a title
    doc.text('Test Bookings Report', 14, 16);

    // Prepare table data
    const tableData = testBookings.map((booking) => [
      booking.test_id,
      booking.patient_no,
      booking.lab_no,
      booking.name,
      booking.sex,
      booking.age,
      booking.specimen,
      booking.investigation,
      booking.referredBy,
      booking.date,
    ]);

    // Auto table for jsPDF
    autoTable(doc, {
      head: [['ID', 'Patient No', 'Lab No', 'Name', 'Sex', 'Age', 'Specimen', 'Investigation', 'Referred By', 'Date']],
      body: tableData,
    });

    // Save PDF
    doc.save('test_bookings_report.pdf');
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  const isIndeterminate = Object.values(selectedBookings).some((value) => value) && !isAllSelected;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mt-20 text-center mb-8">Test Records</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-500"
                  onChange={handleSelectAll}
                  checked={isAllSelected}
                  indeterminate={isIndeterminate ? 'indeterminate' : ''}
                />
              </th>
              <th className="p-3">ID</th>
              <th className="p-3">Patient No</th>
              <th className="p-3">Lab No</th>
              <th className="p-3">Name</th>
              <th className="p-3">Sex</th>
              <th className="p-3">Age</th>
              <th className="p-3">Specimen</th>
              <th className="p-3">Investigation</th>
              <th className="p-3">Referred By</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {testBookings.map((booking) => (
              <tr key={booking.test_id} className="hover:bg-gray-100">
                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-500"
                    checked={selectedBookings[booking.test_id] || false}
                    onChange={() => handleCheckboxChange(booking.test_id)}
                  />
                </td>
                <td className="p-3">{booking.test_id}</td>
                <td className="p-3">{booking.patient_no}</td>
                <td className="p-3">{booking.lab_no}</td>
                <td className="p-3">{booking.name}</td>
                <td className="p-3">{booking.sex}</td>
                <td className="p-3">{booking.age || 'N/A'}</td>
                <td className="p-3">{booking.specimen}</td>
                <td className="p-3">{booking.investigation}</td>
                <td className="p-3">{booking.referredBy}</td>
                <td className="p-3">{booking.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
          onClick={handlePrint}
        >
          Print
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={handleDeleteSelected}
        >
          Delete Selected
        </button>
      </div>
    </div>
  );
};

export default TestBookingsList;
