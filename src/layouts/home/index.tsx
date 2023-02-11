import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { TopFrame } from "../../components/topframe";
import "../layout.css";

const { Content } = Layout;

export function HomeLayout() {
  return (
    <Layout>
      <TopFrame></TopFrame>
      <Content>
        <div className="layout-content">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}
