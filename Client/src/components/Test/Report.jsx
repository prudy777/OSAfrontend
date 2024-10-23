import React from 'react'
import { useState } from 'react';

const Report = () => {
      const initialFields = [
        { label: 'Name', value: 'OSAWEMEN EMMANUEL' },
        { label: 'Title', value: 'Medical Laboratory Scientist' }
      ];
      const handleChanges = (index, event) => {
        const newFields = fields.map((field, idx) => {
          if (idx === index) {
            return { ...field, value: event.target.value };
          }
          return field;
        });
        setFields(newFields);
      };
    
    
      const authorizedBy = {
        name: 'OSAWEMEN EMMANUEL',
        title: 'Chief Medical Officer',
      };
    
      const [fields, setFields] = useState(initialFields);
        
  return (
           <div className='m-10'>
        <div className="p-6 bg-white rounded-md shadow-lg">
  <h2 className="text-lg font-semibold mb-4">MEDICAL REPORTS</h2>
  
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-blue-400 rounded-md">
      <thead>
        <tr>
          <th className="px-4 py-2 border text-left font-semibold">Field</th>
          <th className="px-4 py-2 border text-left font-semibold">Value</th>
        </tr>
      </thead>
      <tbody>
        {fields.map((field, index) => (
          <tr key={index} className="hover:bg-blue-50">
            <th className="px-4 py-2 border text-left font-semibold" scope="row">{field.label}:</th>
            <td className="px-4 py-2 border">
              <input
                type="text"
                value={field.value}
                onChange={(event) => handleChanges(index, event)}
                className="w-full p-2 border border-blue-400 rounded-md"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </div>
  {/* End of Medical Reports Footer */}
<p className="text-sm text-black text-center mt-4">END OF MEDICAL REPORTS</p>

{/* Authorized By Section */}
{authorizedBy && (
  <p className="text-sm text-blue-600 text-center font-bold mt-2">
    AUTHORIZED BY: {authorizedBy.name} ({authorizedBy.title})
  </p>
)}
    </div>
  )
}

export default Report