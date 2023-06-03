import React, { useEffect, useState } from "react";
import { Space, Table, Button, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate, useParams } from "react-router-dom";
import { Service } from "service";
import { Endpoint } from "service/endpoint";
import { CreateModal } from "components/create_modal";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { PageHeader } from "components/page_header";

interface DataType {
  key: string;
  name: string;
  description: string;
  createdAt: string;
  createdBy: string;
}

export const TestCaseDashboard: React.FC = () => {
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
          // <Space size="middle">
          //   <Button type="primary" onClick={() => onHandleClick(record)}>Edit</Button>
          //   <Popconfirm
          //       title="Delete the Test Case"
          //       description="Are you sure to delete this Test Case?"
          //       onConfirm={() => onDeleteTestCase(record.id)}
          //       okText="Yes"
          //       cancelText="No"
          //   >
          //       <Button danger type="primary">Delete</Button>
          //   </Popconfirm>
          // </Space>

          <Space size="middle">
            <Button
              type="primary"
              onClick={() => onHandleClick(record)}
              shape="round"
              icon={<EditOutlined />}
              size="small"
            />
            <Popconfirm
              title="Delete the Action Group"
              description="Are you sure to delete this Action Group?"
              onConfirm={() => onDeleteTestCase(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                danger
                type="primary"
                shape="round"
                icon={<DeleteOutlined />}
                size="small"
              />
            </Popconfirm>
          </Space>
        );
      }
    }
  ];

  const { appId = "" } = useParams();

  useEffect(() => {
    fetchTestCases();
  }, []);

  /**
   * onHandleClick - Handle the Action redirect
   * @param record
   */
  const onHandleClick = (record: any) => {
    navigate(record.id);
  };

  /**
   * fetchTestCases - fetch all Action group from the specify Application
   */
  const fetchTestCases = async () => {
    await Service.get(`${Endpoint.v1.case.list(appId)}`)
      .then((testCases) => {
        setDataSource(testCases);
      })
      .finally(() => {});
  };

  /**
   * onAddNewCase - will create new Test Case and
   * Update the existing grid of all the Test Case
   * @param data
   */
  const onAddNewCase = async (data: any) => {
    let payload = { ...data, app_id: appId };
    await Service.post(`${Endpoint.v1.case.create(appId)}`, {
      body: payload
    })
      .then(() => {
        fetchTestCases();
      })
      .finally(() => {});
  };

  /**
   * onDeleteTestCase - Delete the Action Group with a confirmation
   * @param caseId
   */
  const onDeleteTestCase = async (caseId: any) => {
    await Service.delete(`${Endpoint.v1.case.delete(appId, caseId)}`)
      .then(() => {
        fetchTestCases();
      })
      .finally(() => {});
  };

  return (
    <>
      <PageHeader
        title="Test Case"
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
            onOk={onAddNewCase}
            isLoading={false}
            modelFor={"Test Case"}
          />
        )}
      </div>
    </>
  );
};
