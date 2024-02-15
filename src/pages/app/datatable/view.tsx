import { IdentificationIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography
} from "@material-tailwind/react";
import { AppHeader } from "components/header";
import { Select } from "components/select";
import EditableTable, { ColumnField } from "components/table/edit";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Service } from "service";
import { Endpoint } from "service/endpoint";

interface DataType {
  key: string;
  name: string;
  description: string;
  createdAt: string;
  createdBy: string;
}

export const DatatableView: React.FC = () => {
  const navigate = useNavigate();
  const [tableMeta, setTableMeta] = useState([] as any);
  const [dataSource, setDataSource] = useState([
    { New_Column: "sd", New_Column_1: 1, id: 1 }
  ] as any);
  const [field, setField] = useState([] as Array<ColumnField>);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [tableColumnMeta, setTableColumnMeta] = useState([] as any);

  const { appId = "", datatableId = "" } = useParams();

  const getTableData = async () => {
    await Service.get(
      `${Endpoint.v1.datatable.view.batchDataUpdate(appId, datatableId)}`
    )
      .then((record: any) => {
        setDataSource(record);
      })
      .finally(() => {});
  };

  const setCreateDTColumn = (field_id: string, value: any) => {
    let _data = { ...tableColumnMeta };
    _data[field_id] = value;
    setTableColumnMeta(_data);
  };

  /**
   * onCreateNewDataTable - will create new Datatable
   * @param data
   */
  const onCreateNewDTColumn = async () => {
    let payload = {
      ...tableColumnMeta,
      table_id: parseInt(datatableId)
    };
    setIsCreateModalOpen(false);
    await Service.post(
      `${Endpoint.v1.datatable.view.createField(appId, datatableId)}`,
      {
        body: payload
      }
    )
      .then((record: any) => {
        fetchDatatableMeta();
      })
      .finally(() => {});
  };

  const extra: Array<React.ReactNode> = [
    <Popover
      key="createNewDT"
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
            setTableColumnMeta({});
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
          onChange={(e) => setCreateDTColumn("name", e.target.value)}
        />
        <Select
          options={[{ key: "S", label: "String" }]}
          onSelect={(e) => setCreateDTColumn("kind", e.key)}
        ></Select>
        <Button
          color="indigo"
          variant="filled"
          className="flex-shrink-0"
          onClick={() => onCreateNewDTColumn()}
        >
          Create
        </Button>
      </PopoverContent>
    </Popover>
  ];

  const subMenu = [
    {
      icon: IdentificationIcon,
      name: tableMeta.table_name
    }
  ];

  const updateData = async (
    e: ChangeEvent,
    row_id: string,
    field_id: string,
    orginalData: any,
    data?: any
  ) => {
    e.target.classList.add("border-amber-700");
    if (orginalData != data) {
      let payload = {
        row_id: row_id,
        field_id: field_id,
        data: data
      };
      await Service.post(
        `${Endpoint.v1.datatable.view.batchDataUpdate(appId, datatableId)}`,
        {
          body: [payload]
        }
      )
        .then((record: any) => {
          console.log("suss");
          e.target.classList.remove("border-amber-700");
          e.target.classList.add(
            "border-green-700",
            "transition",
            "duration-700",
            "ease-in-out"
          );
          e.target.classList.remove("border-green-700");
        })
        .finally(() => {});
    }
  };
  const processColumn = (headers: Array<any>) => {
    const columns: Array<ColumnField> = headers.map((item: any) => {
      let field_id = item["field_id"];
      let itemResponse: ColumnField = { key: field_id, label: item["name"] };
      if (!item["is_system"]) {
        itemResponse["render"] = (_, record: any) => (
          <input
            type="text"
            key={`rowrecord${record["id"]}${field_id}`}
            defaultValue={record[field_id]}
            onBlur={(e) =>
              updateData(
                e,
                record["id"],
                field_id,
                record[field_id],
                e.target.value
              )
            }
            className="p-2 w-full border-transparent outline-none border-2 focus:border-amber-700 bg-transparent"
          />
        );
        itemResponse["className"] = "p-0 border";
      }
      return itemResponse;
    });
    return columns;
  };

  /**
   * fetchDatatables - fetch all Datatable from the specify Application
   */
  const fetchDatatableMeta = async () => {
    await Service.get(
      `${Endpoint.v1.datatable.view.getDetail(appId, datatableId)}`
    )
      .then((datatable) => {
        setTableMeta(datatable);
        let fields = datatable["fields"];
        fields = processColumn(fields);
        setField(fields);
      })
      .finally(() => {});
  };

  useEffect(() => {
    fetchDatatableMeta();
    getTableData();
  }, []);

  /**
   * addNewColumn - will create new Table Column
   * Update the existing grid of all the Data table
   * @param data
   */
  const addNewColumn = async () => {};
  /**
   * createData - Create new Row and data for the table
   * Update the existing grid of all the Data table
   * @param data
   */
  const createData = async () => {
    let payload = {};
    await Service.post(
      `${Endpoint.v1.datatable.view.createNewRow(appId, datatableId)}`,
      {
        body: payload
      }
    )
      .then((record: any) => {
        getTableData();
      })
      .finally(() => {});
  };

  return (
    <>
      <AppHeader
        key={tableMeta.id}
        title={tableMeta.name}
        subTitle={tableMeta.description}
        subMenu={subMenu}
        extra={extra}
      />
      <EditableTable
        column={field}
        data={dataSource}
        addRow={createData}
      ></EditableTable>
    </>
  );
};
