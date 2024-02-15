import { Spinner as MTS } from "@material-tailwind/react";

export function Spinner() {
  return (
    <div className="flex items-end gap-8">
      <MTS color="indigo" className="size-12" />
    </div>
  );
}
