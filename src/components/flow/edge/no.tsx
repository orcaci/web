import {
  ArrowPathRoundedSquareIcon,
  CodeBracketSquareIcon,
  HashtagIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath
} from "reactflow";
import { New } from "../components";

// export default function CustomEdge() {
export const NoEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition
}) => {
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
  const [open, setOpen] = useState(false);
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition
  });
  console.log("edgePath", edgePath);
  console.log("edgePath", `M`);

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={{ backgroundColor: "black" }} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: "all"
          }}
          className="nodrag nopan"
        >
          <New></New>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
