import { Typography } from "@material-tailwind/react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
export interface WorkflowFormParm {
  title: string;
}

export const WorkflowForm: React.FC<WorkflowFormParm> = ({ title }) => {
  return (
    <>
      <div className="pl-4 py-4 shadow-md lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight">
            Back End Developer
          </h2>
        </div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          {/* <span className="hidden sm:block">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <PencilIcon
                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </button>
          </span> */}

          {/* <span className="sm:ml-3">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <CheckIcon
                className="-ml-0.5 mr-1.5 h-5 w-5"
                aria-hidden="true"
              />
              Save
            </button>
          </span> */}
        </div>
      </div>
      <div className="flex ">
        <Typography variant="h5" color="blue-gray">
          Recent Transactions
        </Typography>
      </div>
      {/* <Card className="w-full">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none bg-indigo-200"
        >
          <div className="mb-4 flex ">
            <Typography variant="h5" color="blue-gray">
              Recent Transactions
            </Typography>
          </div>
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            UI/UX Review Check
          </Typography>
          <Typography>
            The place is close to Barceloneta Beach and bus stop just 2 min by
            walk and near to &quot;Naviglio&quot; where you can enjoy the main
            night life in Barcelona.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button>Read More</Button>
        </CardFooter>
      </Card> */}
    </>
  );
};
