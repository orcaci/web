import React, { useEffect, useState } from "react";
import { Space, Table, Button, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate, useParams } from "react-router-dom";
import { Service } from "service";
import { Endpoint } from "service/endpoint";
import { CreateModal } from "components/create_modal";
import { PlusOutlined } from "@ant-design/icons";
import { PageHeader } from "components/page_header";

interface DataType {
  key: string;
  name: string;
  description: string;
  createdAt: string;
  createdBy: string;
}

export const TestSuiteDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([] as any);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Button type="link" onClick={() => onHandleClick(record)}>
          {text}
        </Button>
      )
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
          <Space size="middle">
            <Button type="primary" onClick={() => onHandleClick(record)}>
              Edit
            </Button>
            <Popconfirm
              title="Delete the Test Suite"
              description="Are you sure to delete this Test Suite?"
              onConfirm={() => onDeleteTestSuite(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger type="primary">
                Delete
              </Button>
            </Popconfirm>
          </Space>
        );
      }
    }
  ];

  const { appId = "" } = useParams();

  /**
   * fetchTestSuites - fetch all Action group from the specify Application
   */
  const fetchTestSuites = async () => {
    await Service.get(`${Endpoint.v1.suite.list(appId)}`)
      .then((testSuits) => {
        setDataSource(testSuits);
      })
      .finally(() => {});
  };

  useEffect(() => {
    fetchTestSuites();
  }, [fetchTestSuites]);

  /**
   * onHandleClick - Handle the Action redirect
   * @param record
   */
  const onHandleClick = (record: any) => {
    navigate(record.id);
  };

  /**
   * onAddNewSuite - will create new Test Suite and
   * Update the existing grid of all the Test Suite
   * @param data
   */
  const onAddNewSuite = async (data: any) => {
    let payload = { ...data, app_id: appId };
    await Service.post(`${Endpoint.v1.suite.create(appId)}`, {
      body: payload
    })
      .then(() => {
        fetchTestSuites();
      })
      .finally(() => {});
  };

  /**
   * onDeleteTestSuit - Delete the Action Group with a confirmation
   * @param suiteId
   */
  const onDeleteTestSuite = async (suiteId: any) => {
    await Service.delete(`${Endpoint.v1.suite.delete(appId, suiteId)}`)
      .then(() => {
        fetchTestSuites();
      })
      .finally(() => {});
  };

  return (
    <>
      <PageHeader
        title="Test Suite"
        extra={
          <Button type="primary" onClick={() => setIsCreateModalOpen(true)}>
            <PlusOutlined />
          </Button>
        }
      />
      <Table columns={columns} dataSource={dataSource} rowKey="name" />
      <div>
        {isCreateModalOpen && (
          <CreateModal
            isModalOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onOk={onAddNewSuite}
            isLoading={false}
            modelFor={"Test Suite"}
          />
        )}
      </div>
    </>
  );
};
