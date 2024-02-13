import { Listbox, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  ArrowPathRoundedSquareIcon,
  CodeBracketSquareIcon,
  HashtagIcon
} from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import { NodeProps, Position, useEdges, useNodeId, useStore } from "reactflow";
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
    }
  ];
  const [selected, setValueSelected] = useState({} as any);
  const [open, setOpen] = useState(false);
  const nodeId = useNodeId();
  const useedges = useEdges();

  const { nodeInternals, edges } = useStore(selector);

  const node = nodeInternals.get(nodeId);
  console.log("Got Node", nodeId, node);
  console.log("Edes", edges, useedges);

  const addNode = () => {
    let node = {};
    // setNodes();
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
            // onMouseLeave={() => setOpen(false)}
            // onMouseEnter={() => setOpen(true)}
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
              >
                <div className="flex items-center">
                  {/* {item["icon"]} */}
                  <span className="ml-3 block truncate">{item.label}</span>
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
