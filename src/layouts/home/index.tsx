import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { TopNav } from "../../components/topnav";
import "../layout.css";

const { Content } = Layout;

export function HomeLayout() {
  return (
    <Layout>
      <TopNav />
      <Content>
        <div className="min-h-full">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}
