import React, { useEffect, useState } from "react";
import { Space, Table, Button, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate, useParams } from "react-router-dom";
import { Service } from "service";
import { Endpoint } from "service/endpoint";
import { CreateModal } from "components/createmodel";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface DataType {
  key: string;
  name: string;
  description: string;
  createdAt: string;
  createdBy: string;
}

export const ActionGroupDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([] as any);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => <Button type="link" onClick={() => onHandleClick(record)}>{text}</Button>
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    // {
    //   title: "CreatedAt",
    //   dataIndex: "createdAt",
    //   key: "createdAt"
    // },
    // {
    //   title: "CreatedBy",
    //   key: "createdBy",
    //   dataIndex: "createdBy"
    // },
    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
          <Space size="middle">
            <Button type="primary" onClick={() => onHandleClick(record)} 
                shape="round" icon={<EditOutlined />}  size="small"/>
            <Popconfirm
                title="Delete the Action Group"
                description="Are you sure to delete this Action Group?"
                onConfirm={() => onDeleteActionGroup(record.id)}
                okText="Yes"
                cancelText="No"
            >
                <Button danger type="primary" shape="round" icon={<DeleteOutlined />} size="small" />
            </Popconfirm>
          </Space>
        );
      }
    }
  ];

  const { id = "" } = useParams();

  useEffect(() => {
    fetchActionGroups();
  }, []);

  /**
   * onHandleClick - Handle the Action redirect 
   * @param record 
   */
  const onHandleClick = (record: any) => {
    navigate(record.id);
  };

  /**
   * fetchActionGroups - fetch all Action group from the specify Application
   */
  const fetchActionGroups = async () => {
    await Service.get(`${Endpoint.v1.group.getList(id)}`)
      .then((actionGroups) => {
        setDataSource(actionGroups);
      })
      .finally(() => {});
  };

  /**
   * onAddNewActionGroup - will create new Action Group and 
   * Update the existing grid of all the action group
   * @param data 
   */
  const onAddNewActionGroup = async (data: any) => {
    let payload = {...data, type_field: "ActionGroup", app_id: id}
    await Service.post(`${Endpoint.v1.group.create(id)}`, {
      body: payload
    })
      .then(() => {
        fetchActionGroups();
      })
      .finally(() => {});
  };

  /**
   * onDeleteActionGroup - Delete the Action Group with a confirmation
   * @param groupId 
   */
  const onDeleteActionGroup = async (groupId: any) => {
    await Service.delete(`${Endpoint.v1.group.delete(id, groupId)}`)
      .then(() => {
        fetchActionGroups();
      })
      .finally(() => {});
  };

  return (
    <>
      <Button
        size="large"
        type="primary"
        onClick={() => setIsCreateModalOpen(true)}
      >
        Add
      </Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="name"
      />
      <div>
        {isCreateModalOpen && (
          <CreateModal
            isModalOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onOk={onAddNewActionGroup}
            isLoading={false} 
            modelFor={"Action Group"} />
        )}
      </div>
    </>
  );
};
