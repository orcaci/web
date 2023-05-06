import { Input, Select } from "antd";
import { useEffect, useState } from "react";
import "../style.css";
import { Service } from "../../../service";
import { Endpoint } from "../../../service/endpoint";
import { useParams } from "react-router-dom";

interface AssertBlockProp {
  selected: string;
  id: string;
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

export function AssertBlock(props: AssertBlockProp) {
  const { appId = "" } = useParams();
  const [assertData, setAssertData] = useState({} as ActionItem);

  const fetchAssertData = async () => {
    if (props.selected) {
      await Service.get(Endpoint.v1.action.list(appId, props.selected)).then(
        (data) => {
          setAssertData(data[0] || {});
        }
      );
    }
  };

  const updateBlock = async (data: any) => {
    await Service.update(
      Endpoint.v1.action.update(appId, data.action_group_id, data.id),
      {
        body: data
      }
    );
  };

  useEffect(() => {
    fetchAssertData();
  }, [props.selected]);

  const handleChange = (value: string, valueobj: any) => {
    updateBlock({ ...assertData, [valueobj.id]: value });
    setAssertData({ ...assertData, [valueobj.id]: value });
  };

  const onHandleInputChange = (event: any) => {
    updateBlock({ ...assertData, [event.target.id]: event.target.value });
    setAssertData({ ...assertData, [event.target.id]: event.target.value });
  };

  return (
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
  );
}
