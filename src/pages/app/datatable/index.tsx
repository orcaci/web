import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
  Textarea,
  Tooltip,
  Typography
} from "@material-tailwind/react";
import { ColumnField } from "components/table";
import { ReadOnlyTableV2 } from "components/table/read";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Service } from "service";
import { Endpoint } from "service/endpoint";

export const Datatable: React.FC = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([] as any);
  const [datatable, setDataTable] = useState({} as any);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const setCreateDataTable = (field_id: string, value: any) => {
    let _data = { ...datatable };
    _data[field_id] = value;
    setDataTable(_data);
  };

  /**
   * onCreateNewDataTable - will create new Datatable
   * @param data
   */
  const onCreateNewDataTable = async () => {
    let payload = {
      ...datatable,
      app_id: appId
    };
    setIsCreateModalOpen(false);
    await Service.post(`${Endpoint.v1.datatable.create(appId)}`, {
      body: payload
    })
      .then((record: any) => {
        fetchDatatables();
        navigate(`${record.id}`);
      })
      .finally(() => {});
  };

  const extra: Array<React.ReactNode> = [
    <Popover
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 }
      }}
      open={isCreateModalOpen}
      handler={setIsCreateModalOpen}
    >
      <PopoverHandler>
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => {
            setDataTable({});
            setIsCreateModalOpen(true);
          }}
        >
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
          New
        </button>
      </PopoverHandler>
      <PopoverContent className="w-96">
        <Typography variant="h6" color="blue-gray" className="mb-6">
          Create New Datatable
        </Typography>
        <Input
          color="indigo"
          variant="standard"
          label="Name"
          placeholder="Name of the Datatable"
          onChange={(e) => setCreateDataTable("name", e.target.value)}
        />
        <Textarea
          label="Description"
          onChange={(e) => setCreateDataTable("description", e.target.value)}
        />
        <Button
          color="indigo"
          variant="filled"
          className="flex-shrink-0"
          onClick={() => onCreateNewDataTable()}
        >
          Create
        </Button>
      </PopoverContent>
    </Popover>
  ];

  const columns: Array<ColumnField> = [
    {
      key: "name",
      label: "Name",
      className: "flex-auto ",
      render: (text, record) => (
        <Button
          variant="text"
          color="indigo"
          className="flex items-center gap-2 hover:bg-transparent"
          onClick={() => onHandleClick(record)}
        >
          {text}
        </Button>
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
          <Tooltip content="Edit table">
            <IconButton variant="text" onClick={() => onHandleClick(record)}>
              <PencilIcon className="h-4 w-4" />
            </IconButton>
          </Tooltip>
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
    <ReadOnlyTableV2
      title="Datatable"
      onCreate={() => toggleModal(true)}
      column={columns}
      data={dataSource}
      extra={extra}
    />
  );
};
