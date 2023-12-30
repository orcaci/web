import { PencilIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";
import React from "react";

export interface ColumnField {
  key: string;
  label: string;
  render?: (value: any, record: any, index?: number) => React.ReactNode;
  isHeadCell?: boolean;
  className?: string;
}

interface TableProps {
  column?: Array<ColumnField>;
  data?: Array<any>;
  addColumn?: () => void;
  addRow?: () => void;
}

const EditableTable: React.FC<TableProps> = ({
  column = [],
  data = [],
  addColumn,
  addRow,
  ...restProps
}) => {
  return (
    <div className="mx-auto p-8">
      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            {column.map((item, index) => (
              <th key={item["key"]} className="py-2 px-4 border">
                {item["label"]}
              </th>
            ))}
            {addColumn != undefined ? (
              <th className="p-2 border">
                <div className="flex gap-4">
                  <IconButton
                    className="cursor-pointer"
                    onClick={() => addColumn()}
                  >
                    <PencilIcon width="18" height="18" />
                  </IconButton>
                </div>
              </th>
            ) : (
              ""
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-gray-100" : ""}
            >
              {column.map((col, colIndex) =>
                col.render != undefined ? (
                  <td key={colIndex} className={col.className}>
                    {col.render(row[col.key], row, rowIndex)}
                  </td>
                ) : (
                  <td key={colIndex} className="p-0 border">
                    row[col.key]
                  </td>
                )
              )}
            </tr>
          ))}
          <tr>
            <td
              key="footer"
              colSpan={column.length + 1}
              className="p-3 border "
            >
              <div className="flex">
                <button
                  onClick={addRow}
                  className="p-2 text-green-500 bg-green-200 hover:bg-green-300 rounded"
                >
                  Add Row
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
