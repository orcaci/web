import React, { useContext, useEffect, useRef, useState } from "react";
import type { InputRef } from "antd";
import { Button, Form, Input, Table } from "antd";
import type { FormInstance } from "antd/es/form";
import "./index.css";
import { AddColumnModal } from "./addColumnModal";

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item style={{ margin: 0 }} name={dataIndex}>
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

interface MatrixProps {
  defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[];
  dataSource: RowData[];
}

interface RowData {
  key: number;
  [key: string]: any;
}

export const Matrix = (props: MatrixProps) => {
  const [dataSource, setDataSource] = useState<RowData[]>(
    props.dataSource || []
  );
  const [defaultColumns, setDefaultColumns] = useState<
    MatrixProps["defaultColumns"]
  >(props.defaultColumns || []);

  const [columnConfig, setColumnConfig] = useState<boolean>(false);

  const [count, setCount] = useState(1);

  const handleAddRows = () => {
    let newData: RowData = {
      key: count
    };
    defaultColumns.forEach(
      (column) => (newData[column.dataIndex] = `Value ${count}`)
    );

    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleAddColumns = () => {
    setColumnConfig(true);
  };

  const onAddColumn = (columnConfig: MatrixProps["defaultColumns"][0]) => {
    setDefaultColumns([...defaultColumns, columnConfig]);
  };

  const handleSave = (row: RowData) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: RowData) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave
      })
    };
  });

  return (
    <div>
      <div className="buttonContainer">
        <div className="buttonGroup">
          <Button onClick={handleAddRows}>Add Row</Button>
          <Button onClick={handleAddColumns}>Add Column</Button>
        </div>
        <div className="buttonGroup">
          <Button onClick={() => console.log(dataSource)} type="primary">
            Save
          </Button>
        </div>
      </div>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
      {columnConfig && (
        <AddColumnModal
          isModalOpen={columnConfig}
          onClose={() => setColumnConfig(false)}
          onOk={onAddColumn}
        />
      )}
    </div>
  );
};
