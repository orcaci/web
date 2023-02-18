import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import "./style.css";

export function ApplicationCard(prop: any) {
  const { appDetails } = prop;
  const navigate = useNavigate();
  return (
    <Card
      className="appCard"
      onClick={() => navigate(`/app/${appDetails.id}`)}
      style={{ width: 200 }}
    >
      <div className="appDetails">
        <p className="appName">{appDetails.name}</p>
        <p className="appDescription">{appDetails.description}</p>
      </div>
    </Card>
  );
}
