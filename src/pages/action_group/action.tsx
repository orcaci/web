import React, { useState } from "react";
import { Matrix } from "../../components/matrix";
import type { ColumnsType } from "antd/es/table";
import { Select, Input, Button } from "antd";
import "./style.css";
import { Service } from "../../service";
import { Endpoint } from "service/endpoint";
import { useParams } from "react-router-dom";

export const Action: React.FC = () => {
  const [dataSource, setDataSource] = useState([] as any);
  const [savedData, setSavedData] = useState({ data_kind: "Static" } as object);
  const { appId = "", actionGroupId = "" } = useParams();

  interface DataType {
    key: string;
    command: string;
    target: string;
    value: string;
  }

  /**
   * fetchActions - will get all the Action for specific action group
   */
  const fetchActions = async () => {
    console.log(appId, "    - ", actionGroupId);
    await Service.get(`${Endpoint.v1.action.list(appId, actionGroupId)}`)
      .then((actions) => {
        setDataSource(actions);
      })
      .finally(() => {
        // all the fallback code will come here
      });
  };

  useEffect(() => {
    fetchActions();
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "Command",
      dataIndex: "command",
      key: "command",
      render: () => (
        <Select
          defaultValue="enter"
          onChange={handleChange}
          id="command"
          options={[
            { value: "Enter", label: "enter", id: "kind" },
            { value: "Click", label: "click", id: "kind" },
            { value: "Open", label: "open", id: "kind" }
          ]}
        />
      )
    },
    {
      title: "Target",
      dataIndex: "target",
      key: "target",
      render: () => (
        <div className="targetContainer">
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
        </div>
      )
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: () => (
        <Input
          placeholder="Please enter value"
          onChange={onHandleInputChange}
          id="data_value"
        />
      )
    }
  ];

  const handleChange = (value: string, valueobj: any) => {
    setSavedData({ ...savedData, [valueobj.id]: value, execution_order: 1 });
  };

  const handleAddRows = () => {
    setDataSource([
      ...dataSource,
      {
        key: "1",
        command: "click",
        target: "Kissflow First Action Group",
        value: "on click data need to load"
      }
    ]);
  };

  const onHandleInputChange = (event: any) => {
    setSavedData({ ...savedData, [event.target.id]: event.target.value });
  };

  const onAddAction = async () => {
    await Service.post(`${Endpoint.v1.action.create(appId, actionGroupId)}`, {
      body: savedData
    })
      .then(() => {})
      .finally(() => {});
  };

  return (
    <div>
      <Button onClick={handleAddRows}>Add Row</Button>
      <Matrix
        dataSource={dataSource}
        defaultColumns={columns}
        onAddColumn={null}
        onAddRow={null}
      />
      <Button onClick={onAddAction}>Save</Button>
    </div>
  );
};
function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}

