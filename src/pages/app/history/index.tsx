import { useParams } from "react-router-dom";
import { ExecutionHistory } from "./historys";

export function History() {
  const { appId = "" } = useParams();
  return (
    <div className="mb-4 py-4 grid grid-cols-1 gap-6 xl:grid-cols-2">
      <ExecutionHistory></ExecutionHistory>
    </div>
  );
}
