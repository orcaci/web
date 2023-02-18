import React, { useEffect, useState } from "react";
import { Space, Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate, useParams } from "react-router-dom";
import { Service } from "../../service";
import { Endpoint } from "../../service/endpoint";
import { CreateApplicationModal } from "../../components/CreateApplicationModal";

interface DataType {
  key: string;
  name: string;
  description: string;
  createdAt: string;
  createdBy: string;
}

export const ActionGroup: React.FC = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([] as any);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt"
    },
    {
      title: "CreatedBy",
      key: "createdBy",
      dataIndex: "createdBy"
    },
    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
          <Space size="middle">
            <a>Edit</a>
            <div
              style={{ marginRight: 16 }}
              onClick={(e) => {
                e.stopPropagation();
                onDeleteAction(record.id);
              }}
            >
              Delete
            </div>
          </Space>
        );
      }
    }
  ];

  const { id = "" } = useParams();

  const fetchApplications = async () => {
    await Service.get(`${Endpoint.v1.group.getList(id)}`)
      .then((appList) => {
        setDataSource(appList);
      })
      .finally(() => {});
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const onHandleRowClick = (record: any, rowIndex: any) => {
    return {
      onClick: (event: any) => {
        event.stopPropagation();
        navigate(record.id);
      }
    };
  };

  const onAddApplication = async (data: any) => {
    await Service.post(`${Endpoint.v1.group.create(id)}`, {
      body: data
    })
      .then(() => {
        fetchApplications();
      })
      .finally(() => {});
  };

  const onDeleteAction = async (groupId: any) => {
    await Service.delete(`${Endpoint.v1.group.delete(id, groupId)}`)
      .then(() => {
        fetchApplications();
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
        onRow={onHandleRowClick}
      />
      <div>
        {isCreateModalOpen && (
          <CreateApplicationModal
            isModalOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onOk={onAddApplication}
            isLoading={false}
          />
        )}
      </div>
    </>
  );
};
