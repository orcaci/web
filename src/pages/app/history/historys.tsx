import {
  CheckCircleIcon,
  EllipsisVerticalIcon
} from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography
} from "@material-tailwind/react";
import { ColumnField, ReadOnlyTable } from "components/table";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Service } from "service";
import { Endpoint } from "service/endpoint";

const TYPE_MAPPING: any = {
  TestCase: (
    <Chip
      size="sm"
      variant="ghost"
      color="green"
      className="rounded-full"
      value="Test Case"
    />
  ),
  TestSuite: (
    <Chip
      size="sm"
      variant="ghost"
      color="blue"
      className="rounded-full "
      value="Test Suite"
    />
  )
};

export const ExecutionHistory: React.FC = () => {
  const navigate = useNavigate();
  /**
   * onHandleClick - Handle the Test case redirect
   * @param record
   */
  const onHandleClick = (record: any) => {
    navigate(`${record.id}`);
  };
  const columns: Array<ColumnField> = [
    {
      key: "id",
      label: "Execution No",
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
      className: "flex-auto ",
      render: (text, record) => (
        <Button
          variant="text"
          color="indigo"
          className="hover:bg-transparent"
          onClick={() => onHandleClick(record)} //
        >
          {text} ({record["reference"]})
        </Button>
      )
    },
    {
      key: "type",
      label: "Type",
      className: "flex-auto",
      render: (text: string, record) => (
        <div className="flex gap-2">
          {TYPE_MAPPING[text]}
          {record["is_dry_run"] ? (
            <Chip
              size="sm"
              variant="ghost"
              color="red"
              className="rounded-full "
              value="Dry run"
            />
          ) : (
            ""
          )}
        </div>
      )
    },
    {
      key: "status",
      label: "Status",
      className: "flex-auto ",
      render: (text, record) => (
        <div className="flex gap-2">
          {text == "Completed" ? (
            <Chip
              variant="ghost"
              color="green"
              size="sm"
              value="Completed"
              icon={
                <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
              }
            />
          ) : text == "Failed" ? (
            <Chip
              variant="ghost"
              color="red"
              size="sm"
              value="Failed"
              icon={
                <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-red-900 content-['']" />
              }
            />
          ) : text == "Running" ? (
            <Chip
              variant="ghost"
              color="orange"
              size="sm"
              value="Running"
              icon={
                <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-orange-900 content-['']" />
              }
            />
          ) : (
            ""
          )}
        </div>
      )
    }
  ];

  const { appId = "" } = useParams();
  const [dataSource, setDataSource] = useState([] as any);
  const fetchActions = async () => {
    await Service.get(`${Endpoint.v1.history.list(appId)}`)
      .then((history) => {
        setDataSource(history);
      })
      .finally(() => {});
  };

  useEffect(() => {
    fetchActions();
  }, []);
  return (
    <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 flex items-center justify-between p-6"
      >
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-1">
            Execution History
          </Typography>
          <Typography
            variant="small"
            className="flex items-center gap-1 font-normal text-blue-gray-600"
          >
            <CheckCircleIcon
              strokeWidth={3}
              className="h-4 w-4 text-blue-gray-200"
            />
            last <strong>30</strong> days
          </Typography>
        </div>
        <Menu placement="left-start">
          <MenuHandler>
            <IconButton size="sm" variant="text" color="blue-gray">
              <EllipsisVerticalIcon
                strokeWidth={3}
                fill="currenColor"
                className="h-6 w-6"
              />
            </IconButton>
          </MenuHandler>
          <MenuList>
            <MenuItem>Action</MenuItem>
            <MenuItem>Another Action</MenuItem>
            <MenuItem>Something else here</MenuItem>
          </MenuList>
        </Menu>
      </CardHeader>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-0">
        <ReadOnlyTable column={columns} data={dataSource}></ReadOnlyTable>
      </CardBody>
    </Card>
  );
};
