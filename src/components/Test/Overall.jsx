import React from 'react'
import { useState, useEffect } from 'react';

const Overall = () => {
    const { patient } = location.state || {};
    const TwoId = (word = '') => {
        if (typeof word !== 'string') {
          return '';
        }
      
        return word.length < 2 ? word : word.substring(0, 2);
      };
      
    
    const initialPatientData = {
        patient_no: patient?.id || '',
        lab_no: '041219025',
        name: `${patient?.first_name || ''} ${patient?.last_name || ''}`,
        sex: patient?.sex || 'MALE',
        age: patient ? calculateAge(patient.dob) : '',
        ageUnit: 'Years',
        specimen: '',
        investigation: '',
        referredBy: '',
        time: '',
        date: new Date().toISOString().split('T')[0],
      };
    
      const initialTests = [
        { id: `${TwoId(patient?.test_type).toUpperCase()}`, name: `${patient?.test_type || ''}`, rate: 0, referenceRange: 'whe', interpretation: 'wrefrd' },
      ];
    
      const [patientData, setPatientData] = useState(initialPatientData);
      const [tests, setTests] = useState(initialTests);
    
      useEffect(() => {
        if (patient) {
          setPatientData(initialPatientData);
        }
      }, [patient]);
    
    
  return (
    <div className='m-10'>
                   {/* Overall Tests Section */}
<h2 className="text-center text-3xl mt-10 font-semibold text-blue-600 mb-4">OVERALL TESTS</h2>
{tests.map((test, index) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 shadow-lg" key={index}>
    <div className="col-span-1">
      <input
        className="w-full px-4 py-2 border border-blue-400 rounded-md"
        type="text"
        name="id"
        placeholder="Test ID"
        value={test.id}
        onChange={(e) => handleTestChange(index, 'id', e.target.value)}
      />
    </div>
    
    <div className="col-span-1">
      <input
        className="w-full px-4 py-2 border border-blue-400 rounded-md"
        type="text"
        name="name"
        placeholder="Test Name"
        value={test.name}
        onChange={(e) => handleTestChange(index, 'name', e.target.value)}
      />
    </div>
    
    <div className="col-span-1">
      <input
        className="w-full px-4 py-2 border border-blue-400 rounded-md"
        type="number"
        name="rate"
        placeholder="Rate"
        value={test.rate}
        onChange={(e) => handleTestChange(index, 'rate', e.target.value)}
      />
    </div>

    <div className="col-span-1">
      <input
        className="w-full px-4 py-2 border border-blue-400 rounded-md"
        type="text"
        name="referenceRange"
        placeholder="Reference Range"
        value={test.referenceRange}
        onChange={(e) => handleTestChange(index, 'referenceRange', e.target.value)}
      />
    </div>

    <div className="col-span-1">
      <input
        className="w-full px-4 py-2 border border-blue-400 rounded-md"
        type="text"
        name="interpretation"
        placeholder="Interpretation"
        value={test.interpretation}
        onChange={(e) => handleTestChange(index, 'interpretation', e.target.value)}
      />
    </div>

    <div className="col-span-1">
      <input
        className="w-full px-4 py-2 border border-blue-400 rounded-md"
        type="text"
        name="price_naira"
        placeholder="Price (Naira)"
        value={test.price_naira}
        onChange={(e) => handleTestChange(index, 'price_naira', e.target.value)}
      />
    </div>

    <div className="col-span-1">
      <input
        className="w-full px-4 py-2 border border-blue-400 rounded-md"
        type="text"
        name="remark"
        placeholder="Remark"
        value={test.remark}
        onChange={(e) => handleTestChange(index, 'remark', e.target.value)}
      />
    </div>

    <div className="col-span-1">
      <button
        className="w-full bg-blue-400 text-white hover:font-bold py-2 rounded-md hover:bg-red-600"
        onClick={() => handleRemoveTest(index)}
      >
        Remove
      </button>
    </div>
  </div>
))}

    </div>
  )
}

export default Overall