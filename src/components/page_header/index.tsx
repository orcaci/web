import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  extra?: ReactNode;
  backIcon?: boolean;
}

export function PageHeader(props: PageHeaderProps) {
  const navigate = useNavigate();
  return (
    <div
      className="page-header"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: "1rem"
      }}
    >
      <p
        style={{
          fontSize: 22,
          margin: 0,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}
      >
        {props.backIcon && (
          <Button
            onClick={() => navigate(-1)}
            type="text"
            icon={<ArrowLeftOutlined />}
          />
        )}
        {props.title}
      </p>
      <div className="extra">{props.extra}</div>
    </div>
  );
}
