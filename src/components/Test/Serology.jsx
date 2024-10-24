import React, { useState } from 'react';

const Serology = () => {
  const serologyData = [
    { test: 'HEPATITIS B Ab.', methodology: 'Rapid Chromatographic immunoassay', result: 'NON-REACTIVE', checked: false },
    { test: 'SYPHILIS TEST (VDRL)', methodology: 'Rapid Chromatographic immunoassay', result: 'NON-REACTIVE', checked: false },
    { test: 'HEPATITIS C Ab.', methodology: 'Rapid Chromatographic immunoassay', result: 'NON-REACTIVE', checked: false },
    { test: 'HIV TEST (1&2)', methodology: 'Rapid Chromatographic immunoassay', result: 'NON-REACTIVE', checked: false },
    { test: 'GHONNORRHEA Ab.', methodology: 'Rapid Chromatographic immunoassay', result: 'NEGATIVE', checked: false },
    { test: 'H. PYLORI Ab.', methodology: 'Rapid Chromatographic immunoassay', result: 'POSITIVE', checked: false },
  ];

  const [serData, setSerData] = useState(serologyData);

  const handleSerologyInputChange = (index, event) => {
    const { name, value } = event.target;
    setSerData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], [name]: value };
      return newData;
    });
  };

  const handleCheckboxChange = (index) => {
    setSerData((prevData) =>
      prevData.map((row, i) => (i === index ? { ...row, checked: !row.checked } : row))
    );
  };

  const deleteCheckedItems = () => {
    const filteredData = serData.filter((row) => !row.checked);
    setSerData(filteredData);
  };

  return (
    <div className='m-10'>
      {serData.length > 0 ? (
        <div>
          <h3 className="text-3xl text-blue-600 text-center mb-6">SEROLOGY</h3>
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white shadow-lg border border-gray-200">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2 border text-center"></th>
                  <th className="px-4 py-2 border text-center font-bold">TEST</th>
                  <th className="px-4 py-2 border text-center font-bold">METHODOLOGY</th>
                  <th className="px-4 py-2 border text-center font-bold">RESULT</th>
                </tr>
              </thead>
              <tbody>
                {serData.map((row, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition-colors">
                    <td className="px-4 py-2 border text-center">
                      <input
                        type="checkbox"
                        checked={row.checked}
                        onChange={() => handleCheckboxChange(index)}
                        className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <input
                        type="text"
                        name="test"
                        value={row.test}
                        onChange={(event) => handleSerologyInputChange(index, event)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter test name"
                      />
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <input
                        type="text"
                        name="methodology"
                        value={row.methodology}
                        onChange={(event) => handleSerologyInputChange(index, event)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter methodology"
                      />
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <input
                        type="text"
                        name="result"
                        value={row.result}
                        onChange={(event) => handleSerologyInputChange(index, event)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter result"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <button
              className="m-5 px-4 py-2 bg-red-500 text-white rounded-lg"
              onClick={deleteCheckedItems}
            >
              Delete 
            </button>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4"></p>
      )}
    </div>
  );
};

export default Serology;
