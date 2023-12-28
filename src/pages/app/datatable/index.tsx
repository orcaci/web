import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Link,
  Popover,
  Text,
  TextArea,
  TextField
} from "@radix-ui/themes";
import { CreateModal } from "components/create_modal";
import { AppHeader } from "components/header";
import { ColumnField, ReadOnlyTable } from "components/table";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Service } from "service";
import { Endpoint } from "service/endpoint";

export const Datatable: React.FC = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([] as any);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const columns: Array<ColumnField> = [
    {
      key: "name",
      label: "Name",
      className: "flex-auto ",
      render: (text, record) => (
        <Link className="ms-16" onClick={() => onHandleClick(record)}>
          {text}
        </Link>
      )
    },
    {
      key: "description",
      label: "Description",
      className: "flex-auto "
    },
    {
      key: "action",
      label: "Action",
      className: "flex-initial w-48",
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

  const updateTableInfo = (event: EventSource, field_id: string) => {};

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
    navigate(`${record.id}`);
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
    await Service.delete(`${Endpoint.v1.datatable.delete(appId, groupId)}`)
      .then(() => {
        fetchDatatables();
      })
      .finally(() => {});
  };

  const toggleModal = async (s: boolean) => {
    setIsCreateModalOpen(s);
  };

  return (
    <>
      <AppHeader title="Datatable" onCreate={() => toggleModal(true)} />
      <Popover.Root>
        <Popover.Trigger>
          <Button variant="classic">
            <PlusIcon width="16" height="16" />
            Application
          </Button>
        </Popover.Trigger>
        <Popover.Content style={{ width: 360 }}>
          <Flex gap="3">
            <Box grow="1">
              <Text>Create New</Text>
              <TextField.Input variant="soft" placeholder="Name of " />
              <TextArea
                placeholder="Write a description…"
                style={{ height: 80 }}
              />
              <Flex gap="3" mt="3" justify="end">
                <Popover.Close>
                  <Button size="1">Create</Button>
                </Popover.Close>
              </Flex>
            </Box>
          </Flex>
        </Popover.Content>
      </Popover.Root>

      <ReadOnlyTable column={columns} data={dataSource} />
      {/* <Modal
        modelFor={"Create New Test Case"}
        isOpen={isCreateModalOpen}
        toggleModal={toggleModal}
      >
        <div>
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Application's Name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write short description..."
            ></textarea>
          </div>
        </div>
      </Modal> */}
      <div>
        {isCreateModalOpen && (
          <CreateModal
            isModalOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onOk={() => onAddNewDatatable()}
            isLoading={false}
            modelFor={"Test Case"}
          />
        )}
      </div>
    </>
  );
};
