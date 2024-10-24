import React from 'react'
import { useState } from 'react';

const Comment = () => {
    const initialData = [
        { investigation: 'Total WBC', result: '6.7', referenceRange: '4.0 – 10.0 X10^3/μL' },
        { investigation: 'Neutrophils', result: '61.0', referenceRange: '45.0 – 70.0 % (2.5-7.5 x10^9/L)' },
        { investigation: 'Lymphocytes', result: '35.0', referenceRange: '20.0 – 40.0 % (1.2- 4.0 x10^9/L)' },
        { investigation: 'Monocytes', result: '3.0', referenceRange: '02-10% (0.2-1.0 x10^9/L)' },
        { investigation: 'Eosinophils', result: '1.0', referenceRange: '1-6% (0.02 – 0.6 x10^9/L)' },
        { investigation: 'Basophils', result: '0.10', referenceRange: '0-2% (0.01- 0.1x10^9/L)' },
        { investigation: 'RBC', result: '4.5', referenceRange: '4.5 - 6.5/pl' },
        { investigation: 'MCV', result: '91.2', referenceRange: '80-100 fl' },
        { investigation: 'MCH', result: '31.6', referenceRange: '27-34pg' },
        { investigation: 'MCHC', result: '33.1', referenceRange: '32-36g/dl' },
        { investigation: 'HGB', result: '13.6', referenceRange: '11.5 – 16.0 g/dL' },
        { investigation: 'HCT (PCV)', result: '43', referenceRange: '32.0 – 49.0 %' },
        { investigation: 'Platelets', result: '250', referenceRange: '150 – 450 X10^3/μL' },
      ];
    const [herData, setHerData] = useState(initialData);
  const [comments, setComments] = useState([{
    redBloodCells: 'Normocytic Normochromic red cells.',
    whiteBloodCells: 'Leucocyte values are within normal limits.',
    platelets: 'Normal and adequate.',
  }]);

    const handleCommentsChange = (field, value) => {
        setComments({ ...comments, [field]: value });
      };
    
  return (
    <div>
        {/* Comments Section */}
<h2 className="text-2xl md:text-3xl text-center font-bold text-blue-600 mt-8 mb-6">
  Comments
</h2>

{/* Blood Film Review */}
<div className="bg-blue-50 p-4 rounded-lg shadow-lg">
  <h3 className="text-xl underline text-blue-500 font-semibold mb-4">Blood Film Review</h3>

  {/* Red Blood Cells */}
  <div className="mb-6">
    <label className="block font-medium text-lg mb-2">
      Red Blood Cells:
    </label>
    <textarea
      className="w-full border border-blue-400 rounded-md p-3 focus:ring focus:ring-blue-200 transition ease-in-out duration-150"
      value={comments.redBloodCells}
      onChange={(e) => handleCommentsChange('redBloodCells', e.target.value)}
      rows="3"
      placeholder="Enter observations for Red Blood Cells"
    />
  </div>

  {/* White Blood Cells */}
  <div className="mb-6">
    <label className="block font-medium text-lg mb-2">
      White Blood Cells:
    </label>
    <textarea
      className="w-full border border-blue-400 rounded-md p-3 focus:ring focus:ring-blue-200 transition ease-in-out duration-150"
      value={comments.whiteBloodCells}
      onChange={(e) => handleCommentsChange('whiteBloodCells', e.target.value)}
      rows="3"
      placeholder="Enter observations for White Blood Cells"
    />
  </div>

  {/* Platelets */}
  <div className="mb-6">
    <label className="block font-medium text-lg mb-2">
      Platelets:
    </label>
    <textarea
      className="w-full border border-blue-400 rounded-md p-3 focus:ring focus:ring-blue-200 transition ease-in-out duration-150"
      value={comments.platelets}
      onChange={(e) => handleCommentsChange('platelets', e.target.value)}
      rows="3"
      placeholder="Enter observations for Platelets"
    />
  </div>
</div>

    </div>
  )
}

export default Comment