import { Outlet } from "react-router-dom";
import { Breadcrumb, Layout, Menu } from "antd";
import { TopFrame } from "../../components/topframe";

const { Header, Content } = Layout;

export function HomeLayout() {
  return (
    <Layout>
      <TopFrame></TopFrame>

      <Outlet />
    </Layout>
  );
}
