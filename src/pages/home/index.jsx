import React from "react";
import { ApplicationCard } from "../../components/applicationCard";

let mockAppList = [
  { name: "Application1", id: "1" },
  { name: "Application2", id: "2" }
];

export function Home() {
  return (
    <>
      <h1 style={{marginBottom:"1.5"}}>My Applications</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {mockAppList.map((app) => (
          <ApplicationCard appDetails={app} />
        ))}
      </div>
    </>
  );
}
