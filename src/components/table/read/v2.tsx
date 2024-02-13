import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Typography
} from "@material-tailwind/react";
import { NotFound } from "assert/svg";
import { ColumnField, ReadOnlyTableProps } from ".";

export const ReadOnlyTable: React.FC<ReadOnlyTableProps> = ({
  column,
  data,
  footer,
  addColumn,
  extra,
  title = "",
  desc = "",
  ...restProps
}) => {
  return (
    <Card className="h-full w-full">
      {title || desc || extra ? (
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h3" color="blue-gray">
                {title}
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                {desc}
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              {extra ? extra.map((item) => item) : ""}
            </div>
          </div>
        </CardHeader>
      ) : (
        ""
      )}
      <CardBody className="overflow-scroll px-0 py-0">
        <table className="w-full min-w-max table-auto text-left">
          {column ? (
            <thead>
              <tr>
                {column.map((item) => (
                  <th
                    key={item["key"]}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      key={`topogrpy${item["key"]}`}
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {item["label"]}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
          ) : (
            ""
          )}
          <tbody>
            {data.length > 0 ? (
              data.map((rowItem: any, index: number) => {
                const isLast = index === rowItem.length - 1;
                const classes = isLast
                  ? "p-2"
                  : "p-2 border-b border-blue-gray-50";
                let id = rowItem["id"];
                return (
                  <tr key={id}>
                    {column.map((colItem: ColumnField, index: number) => {
                      let childRender = rowItem[colItem.key];
                      if (colItem.render) {
                        childRender = colItem.render(childRender, rowItem);
                      }
                      return (
                        <td
                          key={`${id}-${index}`}
                          className={`${classes} ${colItem.className}`}
                        >
                          {childRender}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  key="nodata"
                  colSpan={column.length}
                  className="p-0 border-b border-blue-gray-50"
                >
                  <div className="max-w-4xl mx-auto px-4 py-0 text-center">
                    <div className="flex justify-center items-center mx-auto mb-8">
                      <NotFound width={150} height={150} />
                    </div>

                    <h2 className="text-xl font-bold mb-4">
                      No Data Not Found
                    </h2>

                    <p className="text-gray-700 mb-4">
                      We couldn't find any data for your request. Please try
                      again later or contact support for assistance.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" size="sm">
            1
          </IconButton>
          <IconButton variant="text" size="sm">
            2
          </IconButton>
          <IconButton variant="text" size="sm">
            3
          </IconButton>
          <IconButton variant="text" size="sm">
            ...
          </IconButton>
          <IconButton variant="text" size="sm">
            8
          </IconButton>
          <IconButton variant="text" size="sm">
            9
          </IconButton>
          <IconButton variant="text" size="sm">
            10
          </IconButton>
        </div>
        <Button variant="outlined" size="sm">
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};
