import { Collapse, Input, Select } from "antd";
import { useState } from "react";
import "../style.css";

const { Panel } = Collapse;

export function AssertBlock() {
  const [assertData, setAssertData] = useState([] as any);

  const handleChange = (value: string, valueobj: any) => {
    setAssertData({ ...assertData, [valueobj.id]: value });
  };
  const onHandleInputChange = (event: any) => {
    setAssertData({ ...assertData, [event.target.id]: event.target.value });
  };

  return (
    <div>
      <Collapse style={{ backgroundColor: "#CAD5E2" }}>
        <Panel header="Assert" key="1">
          <div className="assertContainer">
            <Select
              defaultValue="relative"
              onChange={handleChange}
              options={[
                { value: "Id", label: "relative", id: "target_kind" },
                { value: "Xpath", label: "xpath", id: "target_kind" },
                { value: "Css", label: "index", id: "target_kind" }
              ]}
            />
            <Input
              placeholder="Please enter target"
              onChange={onHandleInputChange}
              id="target_value"
            />
            <Input
              placeholder="Please enter value"
              onChange={onHandleInputChange}
              id="data_value"
            />
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}
