import React, { useState } from 'react';

function HaematologyTable() {
  const [herData, setHerData] = useState([
    // Sample data
    { investigation: 'Haemoglobin', result: '', referenceRange: '12-16 g/dL' },
    { investigation: 'White Blood Cell Count', result: '', referenceRange: '4,000-11,000/µL' },
    // Add more rows as needed
  ]);

  const [checkedItems, setCheckedItems] = useState({ Haematology: [] });

  const handleCheckboxChange = (dataType, index) => {
    setCheckedItems((prevChecked) => {
      const updatedChecked = prevChecked[dataType] || [];
      if (updatedChecked.includes(index)) {
        // Uncheck the item
        return {
          ...prevChecked,
          [dataType]: updatedChecked.filter((i) => i !== index),
        };
      } else {
        // Check the item
        return {
          ...prevChecked,
          [dataType]: [...updatedChecked, index],
        };
      }
    });
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...herData];
    updatedData[index][field] = value;
    setHerData(updatedData);
  };

  const handleDeleteCheckedItems = () => {
    const newHerData = herData.filter((_, index) => !checkedItems['Haematology']?.includes(index));
    setHerData(newHerData);

    // Clear the checked items after deletion
    setCheckedItems({ Haematology: [] });
  };

  return (
    <div className="m-10">
      {herData.length > 0 ? (
        <>
          <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 leading-tight text-center">
            HAEMATOLOGY AND COAGULATION STUDIES
          </h2>
          <div className="overflow-x-auto shadow-lg">
            <table className="min-w-full bg-blue-50 border-2 border-blue-400 rounded-lg shadow-lg">
              <thead className="bg-blue-100">
                <tr>
                  <th className="border-r border-b border-blue-400 p-3 text-center"></th>
                  <th className="border-r border-b border-blue-400 p-3 text-left font-bold">INVESTIGATION</th>
                  <th className="border-r border-b border-blue-400 p-3 text-center font-bold">RESULT</th>
                  <th className="border-b border-blue-400 p-3 text-left font-bold">REFERENCE RANGE</th>
                </tr>
              </thead>
              <tbody>
                {herData.map((row, index) => (
                  <tr key={index} className="hover:bg-blue-50">
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5"
                        checked={checkedItems['Haematology']?.includes(index)}
                        onChange={() => handleCheckboxChange('Haematology', index)}
                      />
                    </td>
                    <td className="p-3">{row.investigation}</td>
                    <td className="p-3 text-center">
                      <input
                        type="text"
                        className="border border-blue-400 rounded-md p-2 w-full"
                        value={row.result}
                        onChange={(e) => handleInputChange(index, 'result', e.target.value)}
                      />
                    </td>
                    <td className="p-3">{row.referenceRange}</td>
                  </tr>
                ))}
              </tbody>
              <button
              className="m-5 bg-red-500 text-white py-2 px-4 rounded"
              onClick={handleDeleteCheckedItems}
              disabled={checkedItems['Haematology']?.length === 0}
            >
              Delete
            </button>
            </table>
            
          </div>
        </>
      ) : (
        <p className="text-center text-red-500 mt-4"></p>
      )}
    </div>
  );
}

export default HaematologyTable;
