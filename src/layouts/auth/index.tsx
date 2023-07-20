import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import "../layout.css";

const { Content } = Layout;

export function AuthLayout() {
  return (
    <Layout>
      <Content>
        <div className="layout-content auth-layout">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}
