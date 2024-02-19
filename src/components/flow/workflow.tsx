import ReactFlow, { Background, BackgroundVariant } from "reactflow";

import "reactflow/dist/style.css";
import { flowStateSelector, useFlowStore } from "stores/flow.store";
import { shallow } from "zustand/shallow";
import { DefaultEdge } from "./edge";
import { NoEdge } from "./edge/no";
import { YesEdge } from "./edge/yes";
import { WorkflowForm } from "./form";
import { StartNode } from "./node";
import { ActionNode } from "./node/action";
import { ConditionalNode } from "./node/condition";
import { NewNode } from "./node/new";

const nodeTypes = {
  newNode: NewNode,
  startNode: StartNode,
  actionNode: ActionNode,
  conditionalNode: ConditionalNode
};

const edgeTypes = {
  defaultE: DefaultEdge,
  yes: YesEdge,
  no: NoEdge
};
export interface WorkflowParam {
  nodes?: Array<any>;
  edges?: Array<any>;
}

export const Workflow: React.FC<WorkflowParam> = ({
  // nodes,
  // edges,
  ...restProps
}) => {
  const getLayoutedElements = (nodes: Array<any>, edges: Array<any>): any => {};
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setNodes,
    setEdges,
    rearrangeNodePosition
  } = useFlowStore(flowStateSelector, shallow);
  // useEffect(() => {
  //   setNodes(nodes as any);
  //   setEdges(edges as any);
  // }, [nodes, edges]);
  rearrangeNodePosition();
  return (
    <div className="flex h-dvh w-full flex-row">
      <div className="basis-3/4 border border-indigo-500/20">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          // nodesDraggable={false}
          // onNodesChange={onNodesChange}
          // onEdgesChange={onEdgesChange}
          // onConnect={onConnect}
          elementsSelectable={false}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          panOnDrag
          fitView
        >
          <Background
            className="bg-blue-50"
            variant={BackgroundVariant.Cross}
          />
        </ReactFlow>
      </div>
      <div className="basis-1/4 border border-indigo-500/20">
        <WorkflowForm title={"Righ Column"} />
      </div>
    </div>
  );
};
