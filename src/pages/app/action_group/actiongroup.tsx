import { PlusOutlined } from "@ant-design/icons";
import { ArrowsPointingInIcon } from "@heroicons/react/20/solid";
import { CommandLineIcon } from "@heroicons/react/24/outline";
import { Button, Input, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { InputGroup } from "components/input";
import { PageHeader } from "components/page_header";
import { Select as OSelect } from "components/select";
import EditableTable from "components/table/edit";
import { ActionKind, ActionKindV2 } from "constant/action_kind";
import { TargetV2, Targets } from "constant/target";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Service } from "service";
import { Endpoint } from "service/endpoint";
import { v4 as uuidv4 } from "uuid";
import "./style.css";

export const ActionGroup: React.FC = () => {
  const [dataSource, setDataSource] = useState([] as any);
  const [updateData, setupdateData] = useState({} as any);
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
    await Service.get(`${Endpoint.v1.action.list(appId, actionGroupId)}`)
      .then((actions) => {
        setDataSource(actions);
      })
      .finally(() => {
        // all the fallback code will come here
      });
  };

  const addNewRow = async () => {
    let _uuid = uuidv4();
    let dataSourceLength = dataSource.length + 1;
    let action = {
      id: _uuid,
      execution_order: dataSourceLength,
      description: "",
      data_kind: null,
      data_value: null,
      target_kind: null,
      target_value: null,
      action_group_id: actionGroupId
    };
    setDataSource([...dataSource, action]);
    console.log(dataSource);
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
          defaultValue={record.kind}
          onChange={(value: any, o: any) =>
            handleRowUpdate(record, "kind", value)
          }
          id="command_select"
          key="command_select"
          options={ActionKind.map((x) => {
            return { key: x.value, value: x.value, label: x.value };
          })}
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
            onChange={(value: any, o: any) =>
              handleRowUpdate(record, "target_kind", value)
            }
            options={Targets}
            defaultValue={record.target_kind}
          />
          <Input
            placeholder="Please enter target"
            onChange={(e: any) =>
              handleRowUpdate(record, "target_value", e.target.value)
            }
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
          onChange={(e: any) =>
            handleRowUpdate(record, "data_value", e.target.value)
          }
          id="data_value"
          defaultValue={record.data_value}
        />
      )
    }
  ];

  const handleRowUpdate = (row: any, field: string, value: string) => {
    console.log(row, value, field);
    if (updateData[row.id] !== undefined) {
      row = updateData[row.id];
    }
    row[field] = value;
    let up: any = {};
    up[row.id] = row;

    setupdateData(up);
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
    console.log(dataSource);
    console.log(updateData);

    await Service.post(`${Endpoint.v1.action.create(appId, actionGroupId)}`, {
      body: dataSource
    })
      .then(() => {})
      .finally(() => {});
  };

  return (
    <div className="h-full">
      <PageHeader
        backIcon
        title={""}
        extra={
          <div className="btn-footer">
            <Button type="primary" onClick={addNewRow}>
              <PlusOutlined /> Row
            </Button>
            <Button type="primary" onClick={onAddAction}>
              Save
            </Button>
          </div>
        }
      />
      <EditableTable
        column={[
          {
            key: "Command",
            label: "Command",
            className: "w-1/6",
            render: () => {
              return (
                <OSelect
                  buttonClassName="relative w-full cursor-default bg-transparent py-1.5 pl-3 pr-10 text-left text-gray-900  ring-inset  focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  options={ActionKindV2}
                  dataIndex="key"
                  onSelect={(value: any) => {
                    console.log(value);
                  }}
                  render={(row: any) => {
                    return (
                      <>
                        <CommandLineIcon className="h-5 w-5 text-gray-400"></CommandLineIcon>
                        <span className="ml-3 block truncate">
                          {row["label"]}
                        </span>
                      </>
                    );
                  }}
                ></OSelect>
              );
            }
          },
          {
            key: "kind",
            label: "Kind",
            className: "w-1/6",
            render: () => {
              return (
                <OSelect
                  buttonClassName="relative w-full cursor-default bg-transparent py-1.5 pl-3 pr-10 text-left text-gray-900  ring-inset  focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  options={TargetV2}
                  onSelect={(value: any) => {
                    console.log(value);
                  }}
                  render={(row: any) => {
                    return (
                      <>
                        {/* <CursorArrowRippleIcon className="h-5 w-5 text-gray-400"></CursorArrowRippleIcon> */}
                        <ArrowsPointingInIcon className="h-5 w-5 text-gray-400"></ArrowsPointingInIcon>
                        <span className="ml-3 block truncate">
                          {row["label"]}
                        </span>
                      </>
                    );
                  }}
                ></OSelect>
              );
            }
          },
          {
            key: "Target",
            label: "Target",
            render: (_, row: any) => {
              return <InputGroup.Text key={row["id"]}></InputGroup.Text>;
            }
          },
          {
            key: "Value",
            label: "Value",
            render: (_, row: any) => {
              return <InputGroup.Text key={row["id"]}></InputGroup.Text>;
            }
          }
        ]}
        data={[[], [], [], [], []]}
        addRow={addNewRow}
      ></EditableTable>
      {/* <Matrix
        dataSource={dataSource}
        defaultColumns={columns}
        onAddColumn={null}
        onAddRow={null}
        rowKey="id"
      /> */}
    </div>
  );
};
