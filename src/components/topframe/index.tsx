import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Avatar, Button, Dropdown, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

export function TopFrame() {
  const navigate = useNavigate();

  const menu: MenuProps["items"] = [
    {
      label: "Sign Out",
      key: "sign-out",
      onClick: async () => {
        navigate("/auth/login");
      }
    }
  ];

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <div className="leftRenderer">
        <h2
          className="logo"
          style={{ color: "white", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Orca
        </h2>
      </div>
      <div
        className="rightRenderer"
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center"
        }}
      >
        <Button
          type="link"
          shape="circle"
          icon={<SettingOutlined />}
          size={"large"}
          onClick={() => navigate("/admin/usermanagement")}
        />

        <Dropdown menu={{ items: menu }} placement="bottomLeft">
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
}
