import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import "../style.css";
import { TEST_CASE_BLOCKS } from "../index";
import { MenuClickEventHandler } from "rc-menu/lib/interface";

interface AddBlockProps {
  handleMenuClick?: MenuClickEventHandler;
  style?: React.CSSProperties;
}

export function AddBlock(props: AddBlockProps) {
  const items: MenuProps["items"] = [
    {
      label: "Action",
      key: TEST_CASE_BLOCKS.ACTION
    },
    {
      label: "Assert",
      key: TEST_CASE_BLOCKS.ASSERT
    },
    {
      label: "If Block",
      key: TEST_CASE_BLOCKS.IF
    },
    {
      label: "Iteration",
      key: TEST_CASE_BLOCKS.FOR_LOOP
    }
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
