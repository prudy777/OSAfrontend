import React, { useState } from 'react';

const Parasitology = () => {
  const [marData, setMarData] = useState([
    { test: 'MALARIA PARASITE', methodology: 'Rapid Chromatographic immunoassay', result: '' },
  ]);
  const [checkedItems, setCheckedItems] = useState([]);

  const handleMarDataChange = (index, key, value) => {
    setMarData((prevData) => {
      const updatedData = [...prevData];
      if (updatedData[index]) {
        updatedData[index] = {
          ...updatedData[index],
          [key]: value,
        };
      }
      return updatedData;
    });
  };

  const handleCheckboxChange = (index) => {
    setCheckedItems((prevChecked) => {
      if (prevChecked.includes(index)) {
        return prevChecked.filter((i) => i !== index);
      } else {
        return [...prevChecked, index];
      }
    });
  };

  const handleDeleteCheckedItems = () => {
    const newMarData = marData.filter((_, index) => !checkedItems.includes(index));
    setMarData(newMarData);
    setCheckedItems([]);
  };

  const EditableParasitologyTableRow = ({ row, index }) => (
    <tr className="border-b">
      <td className="py-2 px-4 flex items-center space-x-4">
        <input
          type="checkbox"
          onChange={() => handleCheckboxChange(index)}
          checked={checkedItems.includes(index)}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <input
          type="text"
          value={row.test}
          onChange={(e) => handleMarDataChange(index, 'test', e.target.value)}
          className="form-input w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter test"
        />
      </td>
      <td className="py-2 px-4">
        <input
          type="text"
          value={row.methodology}
          onChange={(e) => handleMarDataChange(index, 'methodology', e.target.value)}
          className="form-input w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter methodology"
        />
      </td>
      <td className="py-2 px-4 text-center">
        <input
          type="text"
          value={row.result}
          onChange={(e) => handleMarDataChange(index, 'result', e.target.value)}
          className="form-input w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter result"
        />
      </td>
    </tr>
  );

  return (
    <div className="m-10">
      {marData.length > 0 ? (
        <>
          <h2 className="text-center text-2xl md:text-3xl font-bold text-blue-600 mb-6 leading-snug">
            PARASITOLOGY
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-blue-50 border-2 border-blue-400 rounded-lg shadow-sm">
              <thead className="bg-blue-100">
                <tr className="h-12">
                  <th className="border-r border-b border-blue-400 p-3 text-left font-bold">TEST</th>
                  <th className="border-x border-b border-blue-400 p-3 text-left font-bold">METHODOLOGY</th>
                  <th className="border-l border-b border-blue-400 p-3 text-center font-bold">RESULTS</th>
                </tr>
              </thead>
              <tbody>
                {marData.map((row, index) => (
                  <EditableParasitologyTableRow
                    key={index}
                    row={row}
                    index={index}
                  />
                ))}
              </tbody>
              <button
              className=" m-5 bg-red-500  text-white p-2 rounded"
              onClick={handleDeleteCheckedItems}
              disabled={checkedItems.length === 0}
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
};

export default Parasitology;
