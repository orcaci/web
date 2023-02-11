import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Avatar, Button } from "antd";

const { Header } = Layout;

export function TopFrame(props: any) {
  return (
    <Header style={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
      <div className="logo" />
      <div style={{float:"right", display:"flex", gap:"1rem", alignItems: "center"}}>
        <Button type="primary" shape="circle" icon={<SettingOutlined />} size={"middle"} />
        <Avatar size="large" icon={<UserOutlined />}>
            "Vasanth Kumar"
        </Avatar>
      </div>
    </Header>
  );
}
