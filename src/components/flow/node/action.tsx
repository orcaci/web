import { useState } from "react";
import { NodeProps, Position, useNodeId } from "reactflow";
import CustomHandle from "../handler/test";

export const ActionNode: React.FC<NodeProps> = ({ data, xPos, yPos }) => {
  const [selected, setValueSelected] = useState({} as any);
  const [open, setOpen] = useState(false);
  const nodeId = useNodeId();
  console.log("x - ", xPos, ", y -", yPos);
  return (
    <>
      <CustomHandle
        type="target"
        position={Position.Top}
        connectionSize={1}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={true}
        isConnectableStart={false}
      />
      <div className="h-10 w-44 border-white bg-indigo-400 rounded-lg shadow-sm hover:shadow-md">
        <div className="self-center p-2 align-middle text-center">
          [ {data?.payload?.type_field} ]
        </div>
      </div>

      <CustomHandle
        type="source"
        position={Position.Bottom}
        connectionSize={1}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={true}
        isConnectableEnd={false}
      />
    </>
  );
};
