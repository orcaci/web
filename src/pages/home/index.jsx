import { Button, Empty } from "antd";
import { useEffect, useState } from "react";
import { ApplicationCard } from "../../components/applicationCard";
import { CreateApplicationModal } from "../../components/CreateApplicationModal";
import { Service } from "../../service";
import { Endpoint } from "../../service/endpoint";
import "./style.css";

export function Home() {
  const [applications, setApplications] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchApplications = async () => {
    let appList = await Service.get(Endpoint.v1.application.getApplications);
    setApplications(appList);
  };

  const onAddApplication = async (data) => {
    setIsLoading(true);
    await Service.post(Endpoint.v1.application.createApplication, {
      body: data
    });
    await fetchApplications();
    setIsLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <>
      <div className="appHeader">
        <h1>My Applications</h1>
        <Button type="primary" onClick={() => setIsCreateModalOpen(true)}>
          Create
        </Button>
      </div>
      {!applications.length && (
        <div className="emptyState">
          <Empty description="No applications found. Please create a new one" />
        </div>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {applications.map((app) => (
          <ApplicationCard key={app.id} appDetails={app} />
        ))}

        {isCreateModalOpen && (
          <CreateApplicationModal
            isModalOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onOk={onAddApplication}
            isLoading={isLoading}
          />
        )}
      </div>
    </>
  );
}
