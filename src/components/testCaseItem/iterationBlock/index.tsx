import { useState } from "react";
import { TestCaseItem } from "..";
import { AddBlock } from "../addBlock";

export function IterationBlock() {
  const [components, setComponents] = useState<any[]>([]);
  return (
    <div
      style={{
        width: 500,
        height: 200,
        border: "1px solid black",
        backgroundColor: "white",
        position: "relative"
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translate(-100%,-50%)"
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25pt"
          height="25pt"
          version="1.1"
          viewBox="0 0 500 500"
        >
          <g>
            <path d="m221.9 109.2 170.8 170.8-170.8 170.8h85.402l170.8-170.8-170.8-170.8z" />
          </g>
        </svg>
      </div>
      <AddBlock
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translate(50%, -50%)"
        }}
        handleMenuClick={(val: any) => {
          setComponents(
            components.concat({
              type: val.key,
              value: {}
            })
          );
        }}
      />
      {components.map((item: any, index: number) => (
        <TestCaseItem type={item.type} key={`${index}-${item.type}`} />
      ))}
    </div>
  );
}