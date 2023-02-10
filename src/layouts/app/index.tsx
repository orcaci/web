import { Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";
import { TopFrame } from "../../components/topframe";

import type { MenuProps } from 'antd';
import { LaptopOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";

const { Header, Content, Sider } = Layout;

export function AppLayout() {
  const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
  }));
  
  const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined].map(
    (icon, index) => {
      const key = String(index + 1);
  
      return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
  
        children: new Array(4).fill(null).map((_, j) => {
          const subKey = index * 4 + j + 1;
          return {
            key: subKey,
            label: `option${subKey}`,
          };
        }),
      };
    },
  );



  return (
    <Layout>
      <Sider width={200} >
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
          items={items2}
        />
      </Sider>
      <Content style={{ padding: "0 20px" }}>
        <div className="site-layout-content">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}
