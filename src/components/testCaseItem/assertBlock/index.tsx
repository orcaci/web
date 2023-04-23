import { Collapse, Input, Select } from "antd";
import { useEffect, useState } from "react";
import "../style.css";
import { Service } from "../../../service";
import { Endpoint } from "../../../service/endpoint";
import { useParams } from "react-router-dom";

const { Panel } = Collapse;

interface AssertBlockProp {
  selected: string;
}

interface ActionItem {
  action_group_id: string;
  data?: string;
  data_kind: string;
  data_value: string;
  description: string;
  execution_order: number;
  id: string;
  kind: string;
  target?: string;
  target_kind: string;
  target_value: string;
}

export function AssertBlock(prop: AssertBlockProp) {
  const { appId = "" } = useParams();
  const [assertData, setAssertData] = useState({} as ActionItem);

  const fetchAssertData = async () => {
    await Service.get(Endpoint.v1.action.list(appId, prop.selected))
      .then((data) => {
        setAssertData(data[0]);
      })
      .finally(() => {});
  };

  useEffect(() => {
    fetchAssertData();
  }, []);

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
              value={assertData.target_kind}
            />
            <Input
              placeholder="Please enter target"
              onChange={onHandleInputChange}
              id="target_value"
              value={assertData.target_value}
            />
            <Input
              placeholder="Please enter value"
              onChange={onHandleInputChange}
              id="data_value"
              value={assertData.data_value}
            />
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}
