import React, { useState } from 'react';

const Chemical = () => {
  const [sData, setSData] = useState([
    {
      liverFunction: {
        bilirubinTotal: { value: '0.6', methodology: 'Modified TAB (End Point)', referenceRange: '<1.3 mg/dL' },
        bilirubinDirect: { value: '0.2', methodology: 'Direct Bilirubin Assay', referenceRange: '<0.3 mg/dL' },
        astSgot: { value: '31', methodology: 'AST Assay (End Point)', referenceRange: '0-35 IU/L' },
        altSgpt: { value: '32', methodology: 'ALT Assay (End Point)', referenceRange: '0-45 IU/L' },
        alp: { value: '209', methodology: 'ALP Assay (End Point)', referenceRange: '50-136 IU/L' },
        albumin: { value: '4.0', methodology: 'Albumin Assay', referenceRange: '3.5-5.0 g/dL' },
        totalProtein: { value: '82', methodology: 'Protein Assay', referenceRange: '60-83 g/L' },
      },
      kidneyFunction: {
        urea: { value: '20', methodology: 'Modified Berthelot (End Point)', referenceRange: '10-55 mg/dL' },
        creatinine: { value: '1.0', methodology: 'Creatinine Assay (End Point)', referenceRange: '0.6-1.3 mg/dL' },
      },
      electrolytes: {
        sodium: { value: '138', methodology: 'Sodium Ion Assay', referenceRange: '135-145 mmol/L' },
        potassium: { value: '3.6', methodology: 'Potassium Ion Assay', referenceRange: '3.5-5.0 mmol/L' },
        chloride: { value: '98', methodology: 'Chloride Ion Assay', referenceRange: '98-107 mmol/L' },
        bicarbonate: { value: '25', methodology: 'Bicarbonate Ion Assay', referenceRange: '22-29 mmol/L' },
      },
      lipidProfile: {
        totalCholesterol: { value: '152', methodology: 'CHOD- PAP Method', referenceRange: '<200 mg/dL' },
        hdl: { value: '72', methodology: 'HDL Assay', referenceRange: '>40 mg/dL' },
        ldl: { value: '65', methodology: 'LDL Assay', referenceRange: '<100 mg/dL' },
        triglycerides: { value: '74', methodology: 'Triglyceride Assay', referenceRange: '<150 mg/dL' },
        vldl: { value: '26', methodology: 'VLDL Assay', referenceRange: '<30 mg/dL' },
      },
      bloodSugar: {
        fastingBloodSugar: { value: '101', methodology: 'Glucometer', referenceRange: '80-120 mg/dL' },
      },
    },
  ]);

  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (index) => {
    setCheckedItems((prevChecked) =>
      prevChecked.includes(index) ? prevChecked.filter((i) => i !== index) : [...prevChecked, index]
    );
  };

  const handleDeleteCheckedItems = () => {
    setSData(sData.filter((_, index) => !checkedItems.includes(index)));
    setCheckedItems([]);
  };

  const handleChangei = (index, event) => {
    const { name, value } = event.target;
    setSData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = {
        ...updatedData[index],
        [name]: value,
      };
      return updatedData;
    });
  };

  return (
    <div className="m-10">
      {sData.length > 0 ? (
        <>
          <h2 className="text-2xl font-extrabold text-blue-600 mb-6">CHEMICAL PATHOLOGY (CHEMISTRY)</h2>

          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="min-w-full text-left text-sm text-gray-500">
              <thead className="bg-blue-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2"></th>
                  <th className="px-4 py-2 font-bold">INVESTIGATION</th>
                  <th className="px-4 py-2 font-bold">METHODOLOGY</th>
                  <th className="px-4 py-2 font-bold">VALUE</th>
                  <th className="px-4 py-2 font-bold">REFERENCE RANGES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sData.map((sdata, index) => (
                  <React.Fragment key={index}>
                    {/* Liver Function Test Section */}
                    <tr>
                      <td colSpan={5} className="bg-blue-200 px-4 py-2 font-bold text-blue-900 uppercase">
                        Liver Function Test
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500"
                          onChange={() => handleCheckboxChange(index)}
                          checked={checkedItems.includes(index)}
                        />
                      </td>
                      <td className="px-4 py-2">Bilirubin Total</td>
                      <td className="px-4 py-2">Modified TAB (End Point)</td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          name="bilirubinTotal"
                          value={sdata.liverFunction.bilirubinTotal.value}
                          onChange={(e) => handleChangei(index, e)}
                        />
                      </td>
                      <td className="px-4 py-2">&lt;1.3 mg/dL</td>
                    </tr>

                    {/* Kidney Function Test Section */}
                    <tr>
                      <td colSpan={5} className="bg-blue-200 px-4 py-2 font-bold text-blue-900 uppercase">
                        Kidney Function Test
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500"
                          onChange={() => handleCheckboxChange(index)}
                          checked={checkedItems.includes(index)}
                        />
                      </td>
                      <td className="px-4 py-2">Urea</td>
                      <td className="px-4 py-2">Modified Berthelot (End Point)</td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          name="urea"
                          value={sdata.kidneyFunction.urea.value}
                          onChange={(e) => handleChangei(index, e)}
                        />
                      </td>
                      <td className="px-4 py-2">10-55 mg/dL</td>
                    </tr>

                    {/* Additional sections for Lipid Profile, Blood Sugar, etc. */}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            <button
              className="m-5 bg-red-500 text-white py-2 px-4 rounded"
              onClick={handleDeleteCheckedItems}
              disabled={checkedItems.length === 0}
            >
              Delete Checked Items
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-red-500 mt-4"></p>
      )}
    </div>
  );
};

export default Chemical;
