import React, { useState } from 'react';

const Medical = () => {
  const [urinalysis, setUrinalysis] = useState([
    { urinalysis: 'colour', methodology: 'Yellow', result: '' },
    { urinalysis: 'appearance', methodology: 'Slightly Turbid', result: '' },
    { urinalysis: 'pH', methodology: '6.5', result: '' },
    { urinalysis: 'specificGravity', methodology: '1.025', result: '' },
    { urinalysis: 'urobilinogen', methodology: 'Normal', result: '' },
    { urinalysis: 'leukocyte', methodology: 'Trace', result: '' },
    { urinalysis: 'bilirubin', methodology: 'Negative', result: '' },
    { urinalysis: 'blood', methodology: 'Negative', result: '' },
    { urinalysis: 'nitrite', methodology: 'Negative', result: '' },
    { urinalysis: 'protein', methodology: 'Negative', result: '' },
    { urinalysis: 'glucose', methodology: 'Nil', result: '' },
    { urinalysis: 'ketones', methodology: 'Negative', result: '' },
    { comment: 'Normal.' },
  ]);

  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (index) => {
    setCheckedItems((prevChecked) => {
      if (prevChecked.includes(index)) {
        return prevChecked.filter((i) => i !== index);
      } else {
        return [...prevChecked, index];
      }
    });
  };

  const handleInputChange = (index, field, value) => {
    const newData = [...urinalysis];
    newData[index][field] = value;
    setUrinalysis(newData);
  };

  const handleDeleteCheckedItems = () => {
    const newUrinalysis = urinalysis.filter((_, index) => !checkedItems.includes(index));
    setUrinalysis(newUrinalysis);
    setCheckedItems([]);
  };

  return (
    <div className="m-10">
      {urinalysis.length > 0 ? (
        <>
          <h2 className="text-center text-2xl md:text-3xl font-bold text-blue-600 mt-10 mb-6">
            MEDICAL MICROBIOLOGY
          </h2>

          <div className="overflow-x-auto border-2 border-blue-400 rounded-lg shadow-lg mb-8">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-blue-100">
                  <th className="w-1/12 p-3 border-b border-blue-300"></th>
                  <th className="w-5/12 p-3 border-b border-blue-300 text-left font-bold">URINALYSIS</th>
                  <th className="w-4/12 p-3 border-b border-blue-300 text-left font-bold">RESULT</th>
                  <th className="w-2/12 p-3 border-b border-blue-300 text-left font-bold">METHODOLOGY</th>
                </tr>
              </thead>
              <tbody>
                {urinalysis.map((row, index) => (
                  <tr key={index} className="hover:bg-blue-50">
                    <td className="text-center p-2">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5"
                        onChange={() => handleCheckboxChange(index)}
                        checked={checkedItems.includes(index)}
                      />
                    </td>
                    <td className="border-t border-b border-blue-300 p-3 align-top">
                      {row.urinalysis}
                    </td>
                    <td className="border-t border-b border-blue-300 p-3 align-top">
                      <input
                        type="text"
                        className="w-full border border-blue-400 rounded-md p-2"
                        value={row.result || ''}
                        onChange={(e) => handleInputChange(index, 'result', e.target.value)}
                      />
                    </td>
                    <td className="border-t border-b border-blue-300 p-3 align-top">
                      {row.methodology}
                    </td>
                  </tr>
                ))}
              </tbody>
              <button
              className="m-5 bg-red-500 text-white py-2 px-4 rounded"
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

export default Medical;
