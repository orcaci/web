import { Listbox, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  ArrowPathRoundedSquareIcon,
  CodeBracketSquareIcon,
  HashtagIcon
} from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import { NodeProps, Position, useEdges, useNodeId, useStore } from "reactflow";
import { flowStateSelector, useFlowStore } from "stores/flow.store";
import { v4 as uuidv4 } from "uuid";
import { shallow } from "zustand/shallow";
import CustomHandle from "../handler/test";

const selector = (s: any) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges
});

export const NewNode: React.FC<NodeProps> = ({ data, xPos, yPos }) => {
  let options = [
    {
      key: "loop",
      label: "Loop",
      icon: <ArrowPathRoundedSquareIcon className="h-5 w-5 text-gray-400" />
    },
    {
      key: "ifcondition",
      label: "If Condidion",
      icon: <HashtagIcon className="h-5 w-5 text-gray-400" />
    },
    {
      key: "block",
      label: "Block",
      icon: <CodeBracketSquareIcon className="h-5 w-5 text-gray-400" />
    },
    {
      key: "action_group",
      label: "Action group",
      icon: <CodeBracketSquareIcon className="h-5 w-5 text-gray-400" />
    }
  ];
  const [selected, setValueSelected] = useState({} as any);
  const [open, setOpen] = useState(false);
  const nodeId = useNodeId();
  const useedges = useEdges();

  // const store = useStoreApi();

  // const { getNodes, setNodes } = store.getState();

  const { nodeInternals } = useStore(selector);

  const { graph, setGraph } = useFlowStore(flowStateSelector, shallow);

  const node = nodeInternals.get(nodeId);

  const findAddNode = (
    graph: Array<any>,
    node: any,
    execution_order: number,
    parent_id: any = undefined
  ) => {
    if (parent_id == data.parent_id) {
      graph
        .filter((x) => x.execution_order >= execution_order)
        .forEach((item) => {
          item.execution_order = item.execution_order + 1;
        });
      graph.splice(execution_order - 1, 0, node);
      return true;
    } else {
      graph.forEach((item) => {
        if (item.children != undefined && item.children.length >= 0) {
          let result = findAddNode(
            item.children,
            node,
            execution_order,
            item.id
          );
          if (result) return true;
        }
      });
    }
    return false;
  };
  const getNewNode = {
    action_group: () => {
      return {
        id: uuidv4(),
        execution_order: data.execution_order,
        kind: "Reference",
        type_field: "ActionGroup",
        reference: uuidv4(),
        parent_id: data.parent_id,
        case_id: data.case_id,
        children: []
      };
    },

    ifcondition: () => {
      let condition_id = uuidv4();
      return {
        id: condition_id,
        execution_order: data.execution_order,
        kind: "SelfReference",
        type_field: "Condition",
        reference: null,
        parent_id: null,
        case_id: data.case_id,
        children: [
          {
            id: uuidv4(),
            execution_order: 1,
            kind: "SelfReference",
            type_field: "YesCase",
            reference: null,
            parent_id: condition_id,
            case_id: data.case_id,
            children: []
          },
          {
            id: uuidv4(),
            execution_order: 2,
            kind: "SelfReference",
            type_field: "NoCase",
            reference: null,
            parent_id: condition_id,
            case_id: data.case_id,
            children: []
          }
        ]
      };
    }
  };

  const addNode = (option: any) => {
    let newNode: any = getNewNode.ifcondition();
    findAddNode(graph, newNode, data.execution_order);
    setGraph(graph);
    console.log(graph);
  };

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
      <Listbox>
        <Listbox.Button
          className="relative rounded-full p-1 text-blue-600 shadow-sm hover:shadow-md bg-white font-bold"
          onMouseOver={() => setOpen(true)}
          onMouseOut={() => setOpen(false)}
        >
          <PlusIcon width="20" height="20" className="self-center px-auto" />
        </Listbox.Button>

        <Transition
          show={open}
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            onMouseOver={() => setOpen(true)}
            onMouseOut={() => setOpen(false)}
            className={
              "absolute z-10 mt-1 max-h-56 w-40 -left-16 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            }
          >
            {options.map((item) => (
              <Listbox.Option
                key={item["key"]}
                className={
                  "text-gray-900 relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
                }
                value={item}
                onClick={() => addNode(item)}
              >
                <div className="flex items-center">
                  <span className="ml-3 block truncate ">{item.label}</span>
                </div>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
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
