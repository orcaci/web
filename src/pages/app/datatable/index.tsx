import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Flex, IconButton, Link } from "@radix-ui/themes";
import { CreateModal } from "components/create_modal";
import { AppHeader } from "components/header";
import { Sheet } from "components/sheet";
import { ColumnField, ReadOnlyTable } from "components/table";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Service } from "service";
import { Endpoint } from "service/endpoint";
import EditableTable, { GoogleFormBlock } from "./table";

export const Datatable: React.FC = () => {
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
              onClick={() => onDeleteDatatable(record.id)}
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
   * fetchDatatables - fetch all Datatable from the specify Application
   */
  const fetchDatatables = async () => {
    await Service.get(`${Endpoint.v1.datatable.getList(appId)}`)
      .then((datatables) => {
        setDataSource(datatables);
      })
      .finally(() => {});
  };

  useEffect(() => {
    fetchDatatables();
  }, []);

  /**
   * onHandleClick - Handle the Action redirect
   * @param record
   */
  const onHandleClick = (record: any) => {
    navigate(record.id);
  };

  /**
   * onAddNewDatatable - will create new Data table and
   * Update the existing grid of all the Data table
   * @param data
   */
  const onAddNewDatatable = async () => {
    let payload = { name: "Untitle's", app_id: appId };
    await Service.post(`${Endpoint.v1.datatable.create(appId)}`, {
      body: payload
    })
      .then((record: any) => {
        navigate(`${record.id}`);
      })
      .finally(() => {});
  };

  /**
   * onDeleteActionGroup - Delete the Action Group with a confirmation
   * @param groupId
   */
  const onDeleteDatatable = async (groupId: any) => {
    await Service.delete(`${Endpoint.v1.group.delete(appId, groupId)}`)
      .then(() => {
        fetchDatatables();
      })
      .finally(() => {});
  };

  return (
    <>
      {/* <AppHeader title={"Data table"} onCreate={() => onAddNewDatatable()} />
      <Sheet /> */}
      <AppHeader
        title="Datatable"
        onCreate={() => setIsCreateModalOpen(true)}
      />
      <ReadOnlyTable column={columns} data={dataSource} />
      <EditableTable></EditableTable>
      <GoogleFormBlock></GoogleFormBlock>
      <div>
        {isCreateModalOpen && (
          <CreateModal
            isModalOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onOk={() => {}}
            isLoading={false}
            modelFor={"Test Case"}
          />
        )}
      </div>
    </>
  );
};
