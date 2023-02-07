import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Image, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import logo from "../../logo.svg";
import { ItemType } from "antd/es/menu/hooks/useItems";
const { Header } = Layout;

export const TopNav = () => {
  const menu: ItemType[] = [
    {
      label: "Sign Out",
      key: "sign-out",
      onClick: async () => {
        navigate("/signin");
      }
    }
  ];

  const navigate = useNavigate();
  return (
    <Header
      className="header"
      style={{
        display: "flex",
        gap: 10,
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 2rem"
      }}
    >
      <Image
        height={"100%"}
        style={{ margin: "auto 0", padding: 10, cursor: "pointer" }}
        src={logo}
        preview={false}
      />
      <Dropdown menu={{ items: menu }} placement="bottomLeft">
        <UserOutlined
          style={{
            fontSize: 20,
            color: "white"
          }}
        />
      </Dropdown>
    </Header>
  );
};
