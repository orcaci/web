import React, { useContext, useEffect, useRef, useState } from "react";
import type { InputRef } from "antd";
import { Button, Form, Input, Table } from "antd";
import type { FormInstance } from "antd/es/form";
import { AddColumnModal } from "./add_column_modal";
import "./style.css";

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
  // defaultColumns: (ColumnTypes[number] & {
  //   editable?: boolean;
  //   dataIndex: string;
  // })[];
  defaultColumns?: any;
  dataSource: RowData[];
  onAddRow?: any;
  onAddColumn?: any;
  onRowEdit?: any;
  rowKey?: string;
}

interface RowData {
  key: string;
  [key: string]: any;
}

export const Matrix = (props: MatrixProps) => {
  const { onAddColumn, onAddRow, dataSource, defaultColumns, onRowEdit, rowKey } =
    props;

  const [columnConfig, setColumnConfig] = useState<boolean>(false);

  const handleAddRows = () => {
    onAddRow();
  };

  const handleAddColumns = () => {
    setColumnConfig(true);
  };

  const handleSave = (row: RowData) => {
    const item = dataSource.find((item) => row.key === item.key);
    const newRowValue: RowData = {
      ...item,
      ...row
    };
    onRowEdit({
      affectedRow: row.key,
      newValue: newRowValue
    });
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  };

  const columns = defaultColumns.map((col: any) => {
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
          {onAddRow && <Button onClick={handleAddRows}>Add Row</Button>}
          {onAddColumn && (
            <Button onClick={handleAddColumns}>Add Column</Button>
          )}
        </div>
      </div>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        rowKey={rowKey}
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
