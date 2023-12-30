/// Readonly table from Orca

import { PlusIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";
import { Table } from "@radix-ui/themes";
import { NotFound } from "assert/svg";
import PagenationExample from "components/pagination";

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
  footer?: React.ReactNode;
}

const defaultFooter = (span: number) => {
  return (
    <Table.Row>
      <Table.Cell colSpan={span}>
        <PagenationExample></PagenationExample>
      </Table.Cell>
    </Table.Row>
  );
};

export const ReadOnlyTable: React.FC<ReadOnlyTableProps> = ({
  column,
  data,
  footer,
  addColumn,
  ...restProps
}) => {
  if (!footer) {
    footer = defaultFooter(column.length);
  }
  return (
    <>
      <div className="flex">
        <Table.Root variant="surface" className="w-full">
          <Table.Header>
            <Table.Row>
              {column.map((item: ColumnField, index: number) => {
                return (
                  <Table.ColumnHeaderCell
                    key={`tableheaderRowColumn${index}`}
                    className={item.className}
                  >
                    {item.label}
                  </Table.ColumnHeaderCell>
                );
              })}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.length > 0 ? (
              data.map((row: any, index: number) => {
                return (
                  <Table.Row key={`tableDataRow${index}`}>
                    {column.map((item: ColumnField, index: number) => {
                      let childRender = row[item.key];
                      if (item.render) {
                        childRender = item.render(row[item.key], row);
                      }
                      return (
                        <Table.Cell
                          key={`tableDataRowColumn${index}`}
                          className={item.className}
                        >
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
                  </div>
                </Table.Cell>
              </Table.Row>
            )}
            {footer}
          </Table.Body>
        </Table.Root>
        {addColumn ? (
          <div className="p-3">
            <div className="flex gap-4">
              <IconButton
                className="cursor-pointer bg-transparent"
                onClick={() => console.log("click")}
              >
                <PlusIcon width="18" height="18" />
              </IconButton>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
