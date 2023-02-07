import React, { useState } from "react";
import { Menu, Layout } from "antd";
import type { MenuProps } from 'antd';

const { Sider } = Layout;

interface LeftNavProps {
  onClick: MenuProps['onClick'];
  menuItems: MenuProps['items'];
}

export const LeftNav = (props: LeftNavProps) => {
  const { onClick, menuItems } = props;
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={200}
      collapsedWidth="3.5rem"
      className="site-layout-background"
    >
      <Menu
        mode="inline"
        style={{
          height: "100%",
          borderRight: 0
        }}
        inlineCollapsed={true}
        onClick={onClick}
        items={menuItems}
      />
    </Sider>
  );
};
