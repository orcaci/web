import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Service } from "service";
import { Endpoint } from "service/endpoint";
import { Sheet } from "components/sheet";
import { AppHeader, SubMenuProps } from "components/header";
import { IdentificationIcon } from "@heroicons/react/20/solid";
import { EditorV2 } from "components/sheet/v2";

interface DataType {
  key: string;
  name: string;
  description: string;
  createdAt: string;
  createdBy: string;
}

export const DatatableView: React.FC = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([] as any);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const subMenu = [
    {
      icon: IdentificationIcon,
      name: dataSource.table_name
    }
  ];

  const { appId = "", datatableId = "" } = useParams();

  /**
   * fetchDatatables - fetch all Datatable from the specify Application
   */
  const fetchDatatableMeta = async () => {
    await Service.get(
      `${Endpoint.v1.datatable.view.getDetail(appId, datatableId)}`
    )
      .then((datatable) => {
        console.log(`Get Data Table ${JSON.stringify(datatable)}`);
        setDataSource(datatable);
      })
      .finally(() => {});
  };

  /**
   * fetchDatatableById - fetch all Datatable from the specify Application
   */
  const fetchDatatableById = async () => {
    await Service.get(`${Endpoint.v1.datatable.getList(appId)}`)
      .then((datatables) => {
        setDataSource(datatables);
      })
      .finally(() => {});
  };
  useEffect(() => {
    fetchDatatableMeta();
  }, []);

  /**
   * onHandleClick - Handle the Action redirect
   * @param record
   */
  const onHandleClick = (record: any) => {
    navigate(record.id);
  };

  /**
   * onAddNewDatatable - will create new Data table and
   * Update the existing grid of all the Data table
   * @param data
   */
  const onAddNewDatatable = async () => {
    let payload = { name: "New Column", kind: "S", table_id: datatableId };
    await Service.post(
      `${Endpoint.v1.datatable.view.createField(appId, datatableId)}`,
      {
        body: payload
      }
    )
      .then((record: any) => {
        navigate(record.id);
      })
      .finally(() => {});
  };

  return (
    <>
      <AppHeader
        title={dataSource.name}
        subTitle={dataSource.description}
        subMenu={subMenu}
        createBtnName={"Create Column"}
        onCreate={() => onAddNewDatatable()}
      />
      {/* <Sheet /> */}
      <EditorV2 />
    </>
  );
};
