import { Collapse, Select } from "antd";
import  { useState } from "react";
import { v4 as generateUniqueString } from "uuid";
// import { useParams } from "react-router-dom";
import { useResizerObserver } from "../../../hooks/resizeobserver";
// import { Service } from "../../../service";
// import { Endpoint } from "../../../service/endpoint";
import { TestCaseItem } from "../index";
import { AddBlock } from "../addBlock/index";
import "../style.css";

const { Panel } = Collapse;

export function IFBlock() {
  //   const { id = "" } = useParams();

  const [trueBlockComponents, setTrueBlockComponents] = useState<any>([]);
  const [falseBlockComponents, setFalseBlockComponents] = useState<any>([]);

  const ifBlockId = `if-${generateUniqueString()}`;
  const [actionGroups, setActionGroups] = useState([]);
  const [selectedAction, setSelectedAction] = useState([]);

  const handleChange = (val: any) => {
    setSelectedAction(val);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Collapse style={{ backgroundColor: "#CAD5E2", width: "fit-content" }}>
        <Panel header="IF" key="1">
          <Select
            style={{ width: "100%" }}
            placeholder="Select an action"
            onChange={handleChange}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true }
            ]}
          />
        </Panel>
      </Collapse>
      <IFBlockSubMenu
        trueBlockComponents={trueBlockComponents}
        setTrueBlockComponents={setTrueBlockComponents}
        falseBlockComponents={falseBlockComponents}
        setFalseBlockComponents={setFalseBlockComponents}
        key={ifBlockId}
      />
      <div
        style={{
          height: "1px",
          width: "100%",
          background: "black",
          position: "relative"
        }}
      />
    </div>
  );
}

interface IfBlockSubmenuProps {
  trueBlockComponents: any;
  setTrueBlockComponents: any;
  falseBlockComponents: any;
  setFalseBlockComponents: any;
}

function IFBlockSubMenu(props: IfBlockSubmenuProps) {
  const {
    trueBlockComponents,
    setTrueBlockComponents,
    falseBlockComponents,
    setFalseBlockComponents
  } = props;
  const trueBlockId = `true-${generateUniqueString()}`;
  const falseBlockId = `false-${generateUniqueString()}`;
  const [, trueBlockWidth] = useResizerObserver(`#${trueBlockId}`);
  const [, falseBlockWidth] = useResizerObserver(`#${falseBlockId}`);

  return (
    <div
      style={{
        display: "flex",
        marginTop: "2rem",
        gap: "10rem",
        position: "relative",
        justifyContent: "flex-end"
      }}
    >
      <div
        id={falseBlockId}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
          position: "relative",
          left: `-${falseBlockWidth / 2}px`
        }}
      >
        <div
          style={{
            background: "red",
            padding: "1rem",
            borderRadius: "0.5rem",
            zIndex: 1
          }}
        >
          FALSE
        </div>
        <div
          style={{
            width: "1px",
            background: "black",
            height: "100%",
            position: "absolute"
          }}
        ></div>
        <div
          className="falseBlock"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem"
          }}
        >
          <div
            className="componentSpace"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem"
            }}
          >
            {falseBlockComponents.map((item: any, index: number) => (
              <TestCaseItem type={item.type} key={`${index}-${item.type}`} />
            ))}
          </div>
          <AddBlock
            handleMenuClick={(val: any) => {
              setFalseBlockComponents(
                falseBlockComponents.concat({
                  type: val.key,
                  value: {}
                })
              );
            }}
          />
          <div
            style={{
              height: "1px",
              width: "1px",
              background: "black",
              position: "relative"
            }}
          />
        </div>
      </div>
      <div
        className="linebwtrueAndFalse"
        style={{
          width: "100%",
          background: "black",
          height: "1px",
          marginTop: "1.5rem",
          position: "absolute",
          zIndex: 0
        }}
      ></div>
      <div
        id={trueBlockId}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
          position: "relative",
          right: `-${trueBlockWidth / 2}px`
        }}
      >
        <div
          style={{
            background: "green",
            padding: "1rem",
            borderRadius: "0.5rem",
            zIndex: 1
          }}
        >
          TRUE
        </div>
        <div
          style={{
            width: "1px",
            background: "black",
            height: "100%",
            position: "absolute"
          }}
        ></div>
        <div
          className="trueBlock"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem"
          }}
        >
          <div
            className="componentSpace"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem"
            }}
          >
            {trueBlockComponents.map((item: any, index: number) => (
              <TestCaseItem type={item.type} key={`${index}-${item.type}`} />
            ))}
          </div>
          <AddBlock
            handleMenuClick={(val: any) => {
              setTrueBlockComponents(
                trueBlockComponents.concat({
                  type: val.key,
                  value: {}
                })
              );
            }}
          />
          <div
            style={{
              height: "1px",
              width: "1px",
              background: "black",
              position: "relative"
            }}
          />
        </div>
      </div>
    </div>
  );
}
