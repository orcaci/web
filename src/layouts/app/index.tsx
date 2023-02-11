import React from "react";
import { Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import {
  PlayCircleOutlined,
  ExperimentOutlined,
  GroupOutlined,
  DatabaseOutlined
} from "@ant-design/icons";
import "../layout.css";

const { Content, Sider } = Layout;

export function AppLayout() {
  const menuItems: MenuProps["items"] = [
    { key: "test-suite", label: "Test Suite", icon: <PlayCircleOutlined /> },
    { key: "test-case", label: "Test Case", icon: <ExperimentOutlined /> },
    { key: "action-group", label: "Action Group", icon: <GroupOutlined /> },
    { key: "data-table", label: "Data table", icon: <DatabaseOutlined /> }
  ];

  return (
    <Layout>
      <Sider width={200}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
          items={menuItems}
        />
      </Sider>
      <Content>
        <div className="layout-content">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}
