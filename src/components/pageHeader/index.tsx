import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  extra?: ReactNode;
}

export function PageHeader(props: PageHeaderProps) {
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
      <p style={{ fontSize: 22, margin: 0 }}>{props.title}</p>
      <div className="extra">{props.extra}</div>
    </div>
  );
}
