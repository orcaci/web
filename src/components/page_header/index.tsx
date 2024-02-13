import { BackspaceIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";
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
      className="pt-4"
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
          <IconButton variant="text" onClick={() => navigate(-1)}>
            <BackspaceIcon className="size-6" />
          </IconButton>
        )}
        {props.title}
      </p>
      <div className="extra">{props.extra}</div>
    </div>
  );
}
