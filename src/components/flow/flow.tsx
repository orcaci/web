import ReactFlow, { Background, useEdgesState, useNodesState } from "reactflow";

import "reactflow/dist/style.css";
import { DefaultEdge } from "./edge";
import { StartNode } from "./node";
import { ActionNode } from "./node/action";
import { NewNode } from "./node/new";

const initialNodes = [
  { id: "3", position: { x: -100, y: 0 }, data: { label: "1" } },
  {
    id: "1",
    type: "actionNode",
    position: { x: 0, y: 0 },
    positionAbsolute: { x: 100, y: 0 },
    data: { label: "1" },
    width: 10
  },
  {
    id: "2",
    type: "newNode",
    position: { x: 178, y: 200 },
    // positionAbsolute: { x: 10, y: 0 },
    data: { label: "2" }
  }
  //   {
  //     id: "100",
  //     position: { x: 30, y: 50 },
  //     data: {}
  //   },

  //   {
  //     id: "110",
  //     position: { x: 48, y: 50 },
  //     data: {}
  //   }
];
const initialEdges = [
  { id: "defaultE", type: "defaultE", source: "1", target: "2" },
  { id: "3->2", type: "defaultE", source: "3", target: "2" }
  //   { id: "100->110", source: "100", target: "110" }
];

const nodeTypes = {
  newNode: NewNode,
  startNode: StartNode,
  actionNode: ActionNode
};

const edgeTypes = {
  defaultE: DefaultEdge
};

export default function RFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        panOnDrag
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
