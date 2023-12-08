/// Readonly table from Orca

import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Flex, IconButton, Table } from "@radix-ui/themes";
import { NotFound } from "assert/svg";

export interface ColumnField {
  key: string;
  label: string;
  render?: (value: any, record: any, index?: number) => React.ReactNode;
  isHeadCell?: boolean;
  className?: string;
}

export interface ActionParam {}

export interface ReadOnlyTableProps {
  column: Array<ColumnField>;
  data: Array<any>;
  actions?: Array<any>;
  isEditable?: boolean;
  addColumn?: boolean;
  footer?: boolean;
}

export const ReadOnlyTable: React.FC<ReadOnlyTableProps> = ({
  column,
  data,
  ...restProps
}) => {
  return (
    <>
      <div className="flex">
        <Table.Root variant="surface" className="w-full">
          <Table.Header>
            <Table.Row>
              {column.map((item: ColumnField) => {
                return (
                  <Table.ColumnHeaderCell>{item.label}</Table.ColumnHeaderCell>
                );
              })}

              {/* <th className="text-center align-middle justify-center items-center mx-auto mb-8">
                <IconButton
                  color="indigo"
                  size="1"
                  className="cursor-pointer"
                  onClick={() => console.log("click")}
                >
                  <PlusIcon width="18" height="18" />
                </IconButton>
              </th> */}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.length > 0 ? (
              data.map((row: any) => {
                return (
                  <Table.Row>
                    {column.map((item: ColumnField) => {
                      let childRender = row[item.key];
                      if (item.render) {
                        childRender = item.render(row[item.key], row);
                      }
                      return (
                        <Table.Cell className={item.className}>
                          {childRender}
                        </Table.Cell>
                      );
                    })}
                  </Table.Row>
                );
              })
            ) : (
              <Table.Row>
                <Table.Cell colSpan={column.length}>
                  {/* <div className="bg-gray-200 p-4">
                  <p className="text-red-500">Data not found.</p>
                </div> */}
                  <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                    <div className="flex justify-center items-center mx-auto mb-8">
                      <NotFound width={250} height={250} />
                    </div>

                    <h2 className="text-xl font-bold mb-4">
                      No Data Not Found
                    </h2>

                    <p className="text-gray-700 mb-4">
                      We couldn't find any data for your request. Please try
                      again later or contact support for assistance.
                    </p>
                    {/* <a
                    href="#"
                    className="inline-flex items-center px-4 py-2 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-600"
                  >
                    Try again
                  </a> */}
                  </div>
                </Table.Cell>
              </Table.Row>
            )}
            <Table.Row>
              <Table.Cell colSpan={column.length}>
                <div className="flex">
                  <button
                    onClick={() => {}}
                    className="p-2 text-green-500 bg-green-200 hover:bg-green-300 rounded"
                  >
                    Add Row
                  </button>
                </div>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
        <div className="p-3">
          <IconButton
            title="Add Column"
            color="indigo"
            size="1"
            className="cursor-pointer"
            onClick={() => console.log("click")}
          >
            <PlusIcon width="18" height="18" />
          </IconButton>
        </div>
      </div>
    </>
  );
};
