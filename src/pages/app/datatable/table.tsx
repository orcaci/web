import { PencilIcon } from "@heroicons/react/24/outline";
import { Flex, IconButton } from "@radix-ui/themes";
import React, { useState } from "react";

const EditableTable = () => {
  const [headers, setHeaders] = useState(["Column 1", "Column 2"]);
  const [tableData, setTableData] = useState([
    ["Row 1 Col 1", "Row 1 Col 2"],
    ["Row 2 Col 1", "Row 2 Col 2"]
  ]);

  const addRow = () => {
    const newRow = Array(headers.length).fill("");
    setTableData([...tableData, newRow]);
  };

  const addColumn = () => {
    setHeaders([...headers, `Column ${headers.length + 1}`]);
    setTableData(tableData.map((row) => [...row, ""]));
  };

  const handleCellChange = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = value;
    setTableData(newData);
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="py-2 px-4 border">
                {header}
              </th>
            ))}
            <th className="p-2 border">
              <Flex align="center" gap="3">
                <IconButton
                  color="indigo"
                  size="1"
                  variant="soft"
                  className="cursor-pointer"
                  onClick={() => console.log("click")}
                >
                  <PencilIcon width="18" height="18" />
                </IconButton>
              </Flex>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-gray-100" : ""}
            >
              {row.map((cell, colIndex) => (
                <td key={colIndex} className="p-0 border">
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) =>
                      handleCellChange(rowIndex, colIndex, e.target.value)
                    }
                    className="p-2 w-full border-none focus:border-none bg-transparent"
                  />
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td
              key="footer"
              colSpan={headers.length + 1}
              className="p-3 border "
            >
              <div className="flex">
                <button
                  onClick={addRow}
                  className="p-2 text-green-500 bg-green-200 hover:bg-green-300 rounded"
                >
                  Add Row
                </button>
                <input
                  type="text"
                  value="Heelow"
                  onChange={(e) => console.log("Hi")}
                  className="p-2 border-none focus:border-none bg-transparent"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;

export const GoogleFormBlock = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      {/* <div className="mx-auto mb-8">
        <img
          src="https://i.stack.imgur.com/3k954.png"
          alt="Google Form illustration"
          className="w-full h-full"
        />
      </div>
      <h2 className="text-xl font-bold mb-4">Google Form</h2>
      <p className="text-gray-700 mb-4">
        Create a Google Form and share it with your friends and family.
      </p>
      <a
        href="https://docs.google.com/forms/"
        className="inline-flex items-center px-4 py-2 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-600"
      >
        Create a Google Form
      </a> */}
    </div>
  );
};
