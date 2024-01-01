import {
  CheckCircleIcon,
  EllipsisVerticalIcon
} from "@heroicons/react/24/outline";
import {
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography
} from "@material-tailwind/react";
import { ReadOnlyTable } from "components/table";
import React from "react";

export const ExecutionHistory: React.FC = () => {
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
        <ReadOnlyTable column={[]} data={[]}></ReadOnlyTable>
      </CardBody>
    </Card>
  );
};
