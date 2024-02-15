import { Card } from "antd";
import { Application } from "pages/home";
import { useNavigate } from "react-router-dom";
import "./style.css";

interface ApplicationCardProps {
  appDetails: Application;
}

export function ApplicationCard(prop: ApplicationCardProps) {
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
