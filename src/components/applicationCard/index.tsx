import { Card } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"

export function ApplicationCard(prop: any) {
  const { appDetails } = prop;
  const navigate = useNavigate();
  return (
    <Card className="appCard" onClick={()=>navigate(`/app/${appDetails.id}`)} style={{ width: 200, height: 150 }}>
      <div>{appDetails.name}</div>
    </Card>
  );
}
