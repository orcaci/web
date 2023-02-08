import React from "react";
import { Matrix } from "../../components/matrix";

export function Home() {
  return (
    <div>
      <Matrix
        defaultColumns={[
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
        ]}
      />
    </div>
  );
}
