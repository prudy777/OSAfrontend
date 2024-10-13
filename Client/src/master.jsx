import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrintedTests = () => {
  const [printedTests, setPrintedTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTests, setFilteredTests] = useState([]);
  const [visibleTests, setVisibleTests] = useState(15);

  useEffect(() => {
    const fetchPrintedTests = async () => {
      try {
        const response = await axios.get('http://localhost:4000/masters');
        setPrintedTests(response.data);
        setFilteredTests(response.data); // Initialize with full data
      } catch (error) {
        console.error('Error fetching printed tests:', error);
        setError('Failed to fetch printed tests');
      } finally {
        setLoading(false);
      }
    };

    fetchPrintedTests();
  }, []);

  useEffect(() => {
    const results = printedTests.filter(test =>
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.patient_id.toString().includes(searchTerm)
    );
    setFilteredTests(results);
  }, [searchTerm, printedTests]);

  const showMoreTests = () => {
    setVisibleTests(prevVisibleTests => prevVisibleTests + 15);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Printed Tests Results</h1>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row items-center mb-6">
          <input
            type="text"
            placeholder="Search by Name or Patient ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:flex-1 px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 md:mb-0 md:mr-4"
          />
          <button
            onClick={() => {}}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Search
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2 border-blue-300 text-left text-blue-700">Patient ID</th>
                <th className="px-4 py-2 border-b-2 border-blue-300 text-left text-blue-700">Lab No</th>
                <th className="px-4 py-2 border-b-2 border-blue-300 text-left text-blue-700">Name</th>
                <th className="px-4 py-2 border-b-2 border-blue-300 text-left text-blue-700">Sex</th>
                <th className="px-4 py-2 border-b-2 border-blue-300 text-left text-blue-700">Age</th>
                <th className="px-4 py-2 border-b-2 border-blue-300 text-left text-blue-700">Investigation</th>
                <th className="px-4 py-2 border-b-2 border-blue-300 text-left text-blue-700">Specimen</th>
                <th className="px-4 py-2 border-b-2 border-blue-300 text-left text-blue-700">Referred By</th>
                <th className="px-4 py-2 border-b-2 border-blue-300 text-left text-blue-700">Date</th>
                <th className="px-4 py-2 border-b-2 border-blue-300 text-left text-blue-700">Rate</th>
                <th className="px-4 py-2 border-b-2 border-blue-300 text-left text-blue-700">Price (Naira)</th>
                <th className="px-4 py-2 border-b-2 border-blue-300 text-left text-blue-700">Reference Range</th>
                <th className="px-4 py-2 border-b-2 border-blue-300 text-left text-blue-700">Interpretation</th>
                <th className="px-4 py-2 border-b-2 border-blue-300 text-left text-blue-700">Remark</th>
              </tr>
            </thead>
            <tbody>
              {filteredTests.slice(0, visibleTests).map((test) => (
                <tr key={test.test_id} className="hover:bg-blue-50">
                  <td className="px-4 py-2 border-b border-blue-200">{test.patient_id ?? 'N/A'}</td>
                  <td className="px-4 py-2 border-b border-blue-200">{test.lab_no ?? 'N/A'}</td>
                  <td className="px-4 py-2 border-b border-blue-200">{test.name ?? 'N/A'}</td>
                  <td className="px-4 py-2 border-b border-blue-200">{test.sex ?? 'N/A'}</td>
                  <td className="px-4 py-2 border-b border-blue-200">{test.age ?? 'N/A'}</td>
                  <td className="px-4 py-2 border-b border-blue-200">{test.investigation ?? 'N/A'}</td>
                  <td className="px-4 py-2 border-b border-blue-200">{test.specimen ?? 'N/A'}</td>
                  <td className="px-4 py-2 border-b border-blue-200">{test.referred_by ?? 'N/A'}</td>
                  <td className="px-4 py-2 border-b border-blue-200">{test.date ?? 'N/A'}</td>
                  <td className="px-4 py-2 border-b border-blue-200">{test.rate ?? 'N/A'}</td>
                  <td className="px-4 py-2 border-b border-blue-200">{test.price_naira ?? 'N/A'}</td>
                  <td className="px-4 py-2 border-b border-blue-200">{test.reference_range ?? 'N/A'}</td>
                  <td className="px-4 py-2 border-b border-blue-200">{test.interpretation ?? 'N/A'}</td>
                  <td className="px-4 py-2 border-b border-blue-200">{test.remark ?? 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Show More Button */}
          {filteredTests.length > visibleTests && (
            <div className="flex justify-center mt-4">
              <button
                onClick={showMoreTests}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
              >
                Show More
              </button>
            </div>
          )}

          {/* No Results Found */}
          {filteredTests.length === 0 && (
            <div className="flex justify-center mt-4">
              <p className="text-gray-500">No tests found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrintedTests;
