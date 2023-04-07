import React, { useEffect, useState } from "react";
import { Matrix } from "components/matrix";
import type { ColumnsType } from "antd/es/table";
import { Select, Input, Button } from "antd";
import { Service } from "service";
import { Endpoint } from "service/endpoint";
import { useParams } from "react-router-dom";
import { ActionKind } from "constant/action_kind";
import { Targets } from "constant/target";

export const Action: React.FC = () => {
  const [dataSource, setDataSource] = useState([] as any);
  const [savedData, setSavedData] = useState({ data_kind: "Static" } as object);
  const { appId = "", actionGroupId = "" } = useParams();

  interface DataType {
    key: string;
    id: string;
    description: string;
    execution_order: string;
    kind: string;
    target_value: string;
    target_kind: string;
    data_value: string;
    data_kind: string;
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
      key: "kind",
      render: (text, record) => (
        <Select
          showSearch
          defaultValue={record.kind}
          onChange={handleChange}
          id="command"
          key="command"
          options={ActionKind.map((x)=>{ return { key: x.value, label: x.value }})}
        />
      )
    },
    {
      title: "Target",
      dataIndex: "target",
      key: "target",
      render: (text, record) => (
        <div className="targetContainer">
          <Select
            onChange={handleChange}
            options={Targets}
            defaultValue={record.target_kind}
          />
          <Input
            placeholder="Please enter target"
            onChange={onHandleInputChange}
            id="target_value"
            defaultValue={record.target_value}
          />
        </div>
      )
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "data_value",
      render: (text, record) => (
        <Input
          placeholder="Please enter value"
          onChange={onHandleInputChange}
          id="data_value"
          defaultValue={record.data_value}
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
        rowKey="id"
      />
      <Button onClick={onAddAction}>Save</Button>
    </div>
  );
};

