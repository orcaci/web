import { graphlib, layout } from "@dagrejs/dagre";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges
} from "reactflow";
import { create } from "zustand";

export const flowStateSelector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  graph: state.graph,
  setGraph: state.setGraph,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  rearrangeNodePosition: state.rearrangeNodePosition
});

export type RFState = {
  nodes: Node<any>[];
  edges: Edge[];
  graph: any[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setGraph: (graph: any[]) => void;
  rearrangeNodePosition: () => void;
  addNewNode: (nodes: Node[]) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
export const useFlowStore = create<RFState>((set, get) => ({
  graph: [],
  nodes: [],
  edges: [],

  setGraph: (graph: any[]) => {
    set({ graph });
    const nodes: Array<any> = [];
    const edges: Array<any> = [];
    generateNodeAndEdge(graph || [], nodes, edges);
    set({ nodes, edges });
    get().rearrangeNodePosition();
  },
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes)
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges)
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges)
    });
  },
  setNodes: (nodes: Node[]) => {
    // console.log(`Updated the Node from the INtial value - ${nodes}`);
    set({ nodes });
  },
  setEdges: (edges: Edge[]) => {
    // console.log(`Updated the edges - ${edges}`);
    set({ edges });
  },
  rearrangeNodePosition: () => {
    const dagreGraph = new graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    const nodes = get().nodes;
    const edges = get().edges;
    // console.log(edges);
    if (nodes.length == 0) return;
    dagreGraph.setGraph({
      rankdir: "TB",
      ranker: "network-simplex",
      nodesep: 500,
      edgesep: 100,
      marginx: 30,
      marginy: 20
    });

    const sizeMatrix: any = {
      newNode: { width: 28, height: 30 },
      actionNode: { width: 176, height: 40 },
      conditionalNode: { width: 384, height: 40 }
    };

    nodes.forEach((node: any) => {
      const nodeType: string = node["type"];
      const wxh: any = {};
      Object.assign(wxh, sizeMatrix[nodeType] || { width: 400, height: 100 });
      dagreGraph.setNode(node.id, wxh);
    });
    // console.log(nodes);

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target, { minlen: 1 });
    });

    layout(dagreGraph);
    dagreGraph.graph();

    // console.log("result", "graph", );

    const resultNode: Array<any> = [];
    nodes.forEach((node: any) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      // console.log("result", node.id, nodeWithPosition);
      node.targetPosition = "top";
      node.sourcePosition = "bottom";

      //   let t: string = node["type"];
      //   let s: any = sizeMatrix[t] || { width: 172, height: 36 };

      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      node.position = {
        x: nodeWithPosition.x - nodeWithPosition.width / 2,
        y: nodeWithPosition.y //- nodeWithPosition.height / 2
      };
      // if (node["id"].startsWith("addBlockyes")) {
      //   node.position.x = node.position.x - 100;
      // } else if (node["id"].startsWith("addBlockno")) {
      //   node.position.x = node.position.x + 100;
      // }
      resultNode.push(node);
      return node;
    });
    // console.log("currect value of the width and height ", " - ", nodes);
    set({ nodes, edges });
    return { nodes: resultNode, edges: edges };
  },
  addNewNode: (nodes: Node[]) => {
    // console.log(`Updated the edges - ${nodes}`);
    set({ nodes: [] });
  }
}));

const blockType: any = {
  Assertion: "actionNode",
  Condition: "conditionalNode",
  YesCase: "yes",
  NoCase: "no"
};

const processNode = (
  item: any,
  nodes: Array<any>,
  edges: Array<any>,
  derivedEdge: any = undefined,
  parentID: any = undefined
) => {
  const _blockType = blockType[item.type_field] || "actionNode";
  if (derivedEdge != undefined) {
    edges.push({
      ...derivedEdge,
      id: `${derivedEdge?.id}_to_${_blockType}${item.id}`,
      type: "defaultE",
      target: `${_blockType}${item.id}`
    });
  }
  nodes.push({
    id: `${_blockType}${item.id}`,
    type: _blockType,
    position: { x: 0, y: 300 },
    data: { payload: item }
  });
  if (_blockType == blockType.Assertion) {
    edges.push({
      id: `edge_${_blockType}_${item.id}`,
      type: "defaultE",
      source: `${_blockType}${item.id}`,
      target: `addBlock${item.id}`
    });
    nodes.push({
      id: `addBlock${item.id}`,
      type: "newNode",
      position: { x: 0, y: 0 },
      data: {
        execution_order: item.execution_order + 1,
        parent_id: parentID,
        case_id: item.case_id
      }
    });
    derivedEdge = {
      id: `edge_newNode_${_blockType}_${item.id}`,
      type: "defaultE",
      source: `addBlock${item.id}`
    };
  } else if (_blockType == blockType.Condition) {
    // looping child action
    const child = item.children;
    if (child != undefined && child.length > 0) {
      // generateNodeAndEdge(child, )
      child.map((child_item: any, _child_index: number) => {
        const field_type = blockType[child_item.type_field] || "actionNode";

        nodes.push({
          id: `addBlock${field_type}${child_item.id}`,
          type: "newNode",
          position: { x: 0, y: 0 },
          data: {
            execution_order: 1,
            parent_id: child_item.id,
            case_id: item.case_id
          }
        });

        edges.push({
          id: `edge_nde_${field_type}_${child_item.id}`,
          type: field_type,
          sourceHandle: field_type,
          source: `${_blockType}${item.id}`,
          target: `addBlock${field_type}${child_item.id}`
        });
        derivedEdge = {
          id: `edge_newNode_${field_type}_${child_item.id}`,
          type: "defaultE",
          source: `addBlock${field_type}${child_item.id}`
        };
        // derivedEdge = {
        //   id: `edge_newNode_${field_type}_${item.id}`,
        //   type: blockType[field_type],
        //   sourceHandle: blockType[field_type],
        //   source: `addBlock${item.id}`
        // };
        const _derivedEdge = generateNodeAndEdge(
          child_item.children,
          nodes,
          edges,
          derivedEdge,
          child_item.id
        );

        edges.push({
          ..._derivedEdge,
          id: `${_derivedEdge?.id}_to_${field_type}${item.id}`,
          type: "defaultE",
          target: `addBlock_endBlockConstion_${item.id}`
        });
      });
    }

    nodes.push({
      id: `addBlock_endBlockConstion_${item.id}`,
      type: "newNode",
      position: { x: 0, y: 0 },
      data: {
        execution_order: item.execution_order + 1,
        parent_id: parentID,
        case_id: item.case_id
      }
    });
    derivedEdge = {
      id: `edge_newNode_${_blockType}_${item.id}`,
      type: "defaultE",
      source: `addBlock_endBlockConstion_${item.id}`
    };
  }

  const child = item.children;
  if (child != undefined && child.length > 0) {
    // generateNodeAndEdge(child, )
  }
  return derivedEdge;
};
const generateNodeAndEdge = (
  input: Array<any>,
  nodes: Array<any>,
  edges: Array<any>,
  derivedEdge: any = undefined,
  parentID: any = undefined
) => {
  input.map((item: any, index: number) => {
    derivedEdge = processNode(item, nodes, edges, derivedEdge, parentID);
  });
  return derivedEdge;
};
