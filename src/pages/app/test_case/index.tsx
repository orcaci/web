import {
  PencilIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import { Flex, IconButton, Link } from "@radix-ui/themes";
import { CreateModal } from "components/create_modal";
import { AppHeader } from "components/header";
import { ColumnField, ReadOnlyTable } from "components/table";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Service } from "service";
import { Endpoint } from "service/endpoint";

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

  const columns: Array<ColumnField> = [
    {
      key: "name",
      label: "Name",
      render: (text, record) => (
        <Link onClick={() => onHandleClick(record)}>{text}</Link>
      )
    },
    {
      key: "description",
      label: "Description"
    },
    {
      key: "action",
      label: "Action",
      render: (text, record) => {
        return (
          <Flex align="center" gap="3">
            <IconButton
              color="indigo"
              size="1"
              variant="soft"
              className="cursor-pointer"
              onClick={() => onHandleClick(record)}
            >
              <PencilIcon width="18" height="18" />
            </IconButton>
            <IconButton
              color="crimson"
              size="1"
              variant="soft"
              className="cursor-pointer"
              onClick={() => onDeleteTestCase(record.id)}
            >
              <TrashIcon width="18" height="18" />
            </IconButton>
          </Flex>
        );
      }
    }
  ];
  const { appId = "" } = useParams();

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
      <AppHeader
        title={"Test Case"}
        onCreate={() => setIsCreateModalOpen(true)}
      />
      <ReadOnlyTable column={columns} data={dataSource} />
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
