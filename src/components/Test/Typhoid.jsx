import React, { useState } from 'react';

const Typhoid = () => {
  const [datas, setDatas] = useState([
    {
      salmonellaTyphiH: '1/20',
      paratyphiAH: '1/20',
      paratyphiBH: '1/20',
      paratyphiCH: '1/20',
      salmonellaTyphiO: '1/20',
      paratyphiAO: '1/20',
      paratyphiBO: '1/20',
      paratyphiCO: '1/160',
    },
  ]);

  const [checkedItems, setCheckedItems] = useState([]);

  const handleDataChange = (index, event) => {
    const { name, value } = event.target;

    // Update datas state
    setDatas((prevData) => {
      const updatedData = [...prevData];
      if (updatedData[index]) {
        updatedData[index] = {
          ...updatedData[index],
          [name]: value,
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
    const newDatas = datas.filter((_, index) => !checkedItems.includes(index));
    setDatas(newDatas);
    setCheckedItems([]);

    // If no items are left, remove the table completely
    if (newDatas.length === 0) {
      setDatas([]);
    }
  };

  return (
    <div className="m-10">
      {datas.length > 0 ? (
        <>
          <h3 className="text-3xl text-blue-600 text-center mt-8 mb-6">TYPHOID TEST (WIDAL)</h3>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white border border-gray-200 rounded-md">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2 border"></th>
                  <th className="px-4 py-2 border text-center font-bold">Antibody</th>
                  <th className="px-4 py-2 border text-center font-bold">Salmonella typhi</th>
                  <th className="px-4 py-2 border text-center font-bold">Paratyphi A</th>
                  <th className="px-4 py-2 border text-center font-bold">Paratyphi B</th>
                  <th className="px-4 py-2 border text-center font-bold">Paratyphi C</th>
                </tr>
              </thead>
              <tbody>
                {datas.map((data, index) => (
                  <React.Fragment key={index}>
                    {/* Antibody H Row */}
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-2 border text-center">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange(index)}
                          className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500"
                          checked={checkedItems.includes(index)}
                        />
                      </td>
                      <td className="px-4 py-2 border text-center">ANTIBODY H</td>
                      <td className="px-4 py-2 border text-center">
                        <input
                          type="text"
                          name="salmonellaTyphiH"
                          value={data.salmonellaTyphiH}
                          onChange={(event) => handleDataChange(index, event)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter value"
                        />
                      </td>
                      <td className="px-4 py-2 border text-center">
                        <input
                          type="text"
                          name="paratyphiAH"
                          value={data.paratyphiAH}
                          onChange={(event) => handleDataChange(index, event)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter value"
                        />
                      </td>
                      <td className="px-4 py-2 border text-center">
                        <input
                          type="text"
                          name="paratyphiBH"
                          value={data.paratyphiBH}
                          onChange={(event) => handleDataChange(index, event)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter value"
                        />
                      </td>
                      <td className="px-4 py-2 border text-center">
                        <input
                          type="text"
                          name="paratyphiCH"
                          value={data.paratyphiCH}
                          onChange={(event) => handleDataChange(index, event)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter value"
                        />
                      </td>
                    </tr>

                    {/* Antibody O Row */}
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-2 border text-center">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange(index)}
                          className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500"
                          checked={checkedItems.includes(index)}
                        />
                      </td>
                      <td className="px-4 py-2 border text-center">ANTIBODY O</td>
                      <td className="px-4 py-2 border text-center">
                        <input
                          type="text"
                          name="salmonellaTyphiO"
                          value={data.salmonellaTyphiO}
                          onChange={(event) => handleDataChange(index, event)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter value"
                        />
                      </td>
                      <td className="px-4 py-2 border text-center">
                        <input
                          type="text"
                          name="paratyphiAO"
                          value={data.paratyphiAO}
                          onChange={(event) => handleDataChange(index, event)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter value"
                        />
                      </td>
                      <td className="px-4 py-2 border text-center">
                        <input
                          type="text"
                          name="paratyphiBO"
                          value={data.paratyphiBO}
                          onChange={(event) => handleDataChange(index, event)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter value"
                        />
                      </td>
                      <td className="px-4 py-2 border text-center">
                        <input
                          type="text"
                          name="paratyphiCO"
                          value={data.paratyphiCO}
                          onChange={(event) => handleDataChange(index, event)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter value"
                        />
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
              <button
              className="m-5 bg-red-500 text-white p-2 rounded"
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

export default Typhoid;
