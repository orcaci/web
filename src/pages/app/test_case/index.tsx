import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
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

export const TestCaseDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([] as any);
  const [testcase, setTestcase] = useState({} as any);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
            setTestcase({});
            setIsCreateModalOpen(true);
          }}
        >
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
          New
        </button>
      </PopoverHandler>
      <PopoverContent className="w-96">
        <Typography variant="h6" color="blue-gray" className="mb-6">
          Create New Action group
        </Typography>
        <Input
          color="indigo"
          variant="standard"
          label="Name"
          placeholder="Name of the Action group"
          onChange={(e) => setCreateTestCase("name", e.target.value)}
        />
        <Textarea
          label="Description"
          onChange={(e) => setCreateTestCase("description", e.target.value)}
        />
        <Button
          color="indigo"
          variant="filled"
          className="flex-shrink-0"
          onClick={() => onCreateTestCase()}
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
          className="hover:bg-transparent"
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
          <>
            <Tooltip content="Edit">
              <IconButton
                className=" hover:bg-transparent"
                variant="text"
                onClick={() => onHandleClick(record)}
              >
                <PencilIcon className="size-4" />
              </IconButton>
            </Tooltip>

            <Tooltip content="Delete">
              <IconButton
                className=" hover:bg-transparent"
                variant="text"
                onClick={() => onDelete(record.id)}
              >
                <TrashIcon className="size-4" />
              </IconButton>
            </Tooltip>
          </>
        );
      }
    }
  ];

  const { appId = "" } = useParams();

  const setCreateTestCase = (field_id: string, value: any) => {
    let _data = { ...testcase };
    _data[field_id] = value;
    setTestcase(_data);
  };

  const updateTableInfo = (event: EventSource, field_id: string) => {};

  /**
   * fetchTestCase - fetch all Test case from the specify Application
   */
  const fetchTestCase = async () => {
    await Service.get(`${Endpoint.v1.case.list(appId)}`)
      .then((cases) => {
        setDataSource(cases);
      })
      .finally(() => {});
  };

  useEffect(() => {
    fetchTestCase();
  }, []);

  /**
   * onHandleClick - Handle the Test case redirect
   * @param record
   */
  const onHandleClick = (record: any) => {
    navigate(`${record.id}`);
  };

  /**
   * onCreateTestCase - will create new Test Case
   * @param data
   */
  const onCreateTestCase = async () => {
    let payload = {
      ...testcase,
      app_id: appId
    };
    await Service.post(`${Endpoint.v1.case.create(appId)}`, {
      body: payload
    })
      .then((record: any) => {
        fetchTestCase();
      })
      .finally(() => {});
  };

  /**
   * onDelete - Delete theTest Case with a confirmation
   * @param caseId
   */
  const onDelete = async (caseId: any) => {
    await Service.delete(`${Endpoint.v1.case.delete(appId, caseId)}`)
      .then(() => {
        fetchTestCase();
      })
      .finally(() => {});
  };

  return (
    <ReadOnlyTableV2
      title="Test Case"
      column={columns}
      data={dataSource}
      extra={extra}
    />
  );
};
