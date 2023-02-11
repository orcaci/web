import React, { useState } from "react";
import { Matrix } from "../../components/matrix";

export function Home() {
  const [columns, setColumns] = useState([
    {
      title: "Command",
      dataIndex: "command",
      editable: true
    },
    {
      title: "Target",
      dataIndex: "target",
      editable: true
    },
    {
      title: "Value",
      dataIndex: "value",
      editable: true
    }
  ]);
  const [dataSource, setDataSource] = useState([
    { key: "1", command: "click", target: "btn" },
    { key: "2", command: "drag", target: "img" }
  ]);

  return (
    <div>
      <Matrix
        defaultColumns={columns}
        dataSource={dataSource}
        onAddRow={() => {
          setDataSource([
            ...dataSource,
            { key: (dataSource.length + 1).toString() }
          ]);
        }}
        onAddColumn={(newColumn) => {
          setColumns([...columns, { ...newColumn }]);
        }}
        onRowEdit={({ affectedRow, newValue }) => {
          const newData = [...dataSource];
          const index = newData.findIndex((item) => affectedRow === item.key);
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...newValue
          });
          setDataSource(newData);
        }}
      />
    </div>
  );
}
