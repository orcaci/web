import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import "../style.css";
import { TEST_CASE_ITEMS } from "../index";

interface AddBlockProps {
  handleMenuClick: any;
  style?: React.CSSProperties;
}

export function AddBlock(props: AddBlockProps) {
  const items: MenuProps["items"] = [
    {
      label: "Action",
      key: TEST_CASE_ITEMS.ACTION
    },
    {
      label: "Assert",
      key: TEST_CASE_ITEMS.ASSERT
    },
    // {
    //   label: "If Block",
    //   key: TEST_CASE_ITEMS.IF
    // },
    // {
    //   label: "Iteration",
    //   key: TEST_CASE_ITEMS.FOR_LOOP
    // }
  ];

  const menuProps = {
    items,
    onClick: props.handleMenuClick
  };
  return (
    <Dropdown menu={menuProps}>
      <Button style={props.style} shape="circle">
        <PlusOutlined />
      </Button>
    </Dropdown>
  );
}
