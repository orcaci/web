// import {
//   PencilIcon,
//   TrashIcon
// } from "@heroicons/react/24/outline";
// import { Flex, IconButton, Link } from "@radix-ui/themes";
// import { CreateModal } from "components/create_modal";
// import { AppHeader } from "components/header";
// import { ColumnField, ReadOnlyTable } from "components/table";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Service } from "service";
// import { Endpoint } from "service/endpoint";

// interface DataType {
//   key: string;
//   name: string;
//   description: string;
//   createdAt: string;
//   createdBy: string;
// }

// export const TestCaseDashboard: React.FC = () => {
//   const navigate = useNavigate();
//   const [dataSource, setDataSource] = useState([] as any);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

//   const columns: Array<ColumnField> = [
//     {
//       key: "name",
//       label: "Name",
//       render: (text, record) => (
//         <Link onClick={() => onHandleClick(record)}>{text}</Link>
//       )
//     },
//     {
//       key: "description",
//       label: "Description"
//     },
//     {
//       key: "action",
//       label: "Action",
//       render: (text, record) => {
//         return (
//           <Flex align="center" gap="3">
//             <IconButton
//               color="indigo"
//               size="1"
//               variant="soft"
//               className="cursor-pointer"
//               onClick={() => onHandleClick(record)}
//             >
//               <PencilIcon width="18" height="18" />
//             </IconButton>
//             <IconButton
//               color="crimson"
//               size="1"
//               variant="soft"
//               className="cursor-pointer"
//               onClick={() => onDeleteTestCase(record.id)}
//             >
//               <TrashIcon width="18" height="18" />
//             </IconButton>
//           </Flex>
//         );
//       }
//     }
//   ];
//   const { appId = "" } = useParams();

//   /**
//    * fetchTestCases - fetch all Action group from the specify Application
//    */
//   const fetchTestCases = async () => {
//     await Service.get(`${Endpoint.v1.case.list(appId)}`)
//       .then((testCases) => {
//         setDataSource(testCases);
//       })
//       .finally(() => {});
//   };

//   useEffect(() => {
//     fetchTestCases();
//   }, []);

//   /**
//    * onHandleClick - Handle the Action redirect
//    * @param record
//    */
//   const onHandleClick = (record: any) => {
//     navigate(record.id);
//   };

//   /**
//    * onAddNewCase - will create new Test Case and
//    * Update the existing grid of all the Test Case
//    * @param data
//    */
//   const onAddNewCase = async (data: any) => {
//     let payload = { ...data, app_id: appId };
//     await Service.post(`${Endpoint.v1.case.create(appId)}`, {
//       body: payload
//     })
//       .then(() => {
//         fetchTestCases();
//       })
//       .finally(() => {});
//   };

//   /**
//    * onDeleteTestCase - Delete the Action Group with a confirmation
//    * @param caseId
//    */
//   const onDeleteTestCase = async (caseId: any) => {
//     await Service.delete(`${Endpoint.v1.case.delete(appId, caseId)}`)
//       .then(() => {
//         fetchTestCases();
//       })
//       .finally(() => {});
//   };

//   return (
//     <>
//       <AppHeader
//         title={"Test Case"}
//         onCreate={() => setIsCreateModalOpen(true)}
//       />
//       <ReadOnlyTable column={columns} data={dataSource} />
//       <div>
//         {isCreateModalOpen && (
//           <CreateModal
//             isModalOpen={isCreateModalOpen}
//             onClose={() => setIsCreateModalOpen(false)}
//             onOk={onAddNewCase}
//             isLoading={false}
//             modelFor={"Test Case"}
//           />
//         )}
//       </div>
//     </>
//   );
// };

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
import { AppHeader } from "components/header";
import { ColumnField, ReadOnlyTable } from "components/table";
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
    <Popover.Root>
      <Popover.Trigger>
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => setTestcase({})}
        >
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
          New
        </button>
      </Popover.Trigger>
      <Popover.Content style={{ width: 360 }}>
        <Flex gap="3">
          <Box grow="1">
            <Text>Create New</Text>
            <TextField.Input
              variant="soft"
              placeholder="Name of Test Case"
              onChange={(e) => setCreateTestCase("name", e.target.value)}
            />
            <TextArea
              variant="soft"
              placeholder="Write a description…"
              style={{ height: 80 }}
              onChange={(e) => setCreateTestCase("description", e.target.value)}
            />
            <Flex gap="3" mt="3" justify="end">
              <Popover.Close>
                <Button size="1" onClick={() => onCreateTestCase()}>
                  Create
                </Button>
              </Popover.Close>
            </Flex>
          </Box>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  ];

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
              onClick={() => onDelete(record.id)}
            >
              <TrashIcon width="18" height="18" />
            </IconButton>
          </Flex>
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
    <>
      <AppHeader title="Test Case" extra={extra} />

      <ReadOnlyTable column={columns} data={dataSource} />
    </>
  );
};
