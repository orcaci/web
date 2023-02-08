import React from "react";
import { Layout } from "antd";
import { TopNav } from "./components/topnav";
import { LeftNav } from "./components/leftnav";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { Outlet, useNavigate } from "react-router-dom";

const { Content } = Layout;

const menuItems: ItemType[] = [
  {
    label: "Home",
    key: "home"
  },
  {
    label: "Section 1",
    key: "section1"
  }
];

interface Props {
  children?: any;
}

export function AppLayout(props: Props) {
  const navigate = useNavigate();
  return (
    <Layout>
      <TopNav />
      <Layout>
        <LeftNav onClick={(e) => navigate(e.key)} menuItems={menuItems} />
        <Layout>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: "calc(100vh - 64px)"
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
