import { PlusOutlined } from "@ant-design/icons";
import { Button, Empty, Spin } from "antd";
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
  const [isListLoading, setIsListLoading] = useState(false);

  const fetchApplications = async () => {
    setIsListLoading(true);
    await Service.get(Endpoint.v1.application.getApplications)
      .then((appList) => {
        setApplications(appList);
      })
      .finally(() => {
        setIsListLoading(false);
      });
  };

  const onAddApplication = async (data) => {
    setIsLoading(true);
    await Service.post(Endpoint.v1.application.createApplication, {
      body: data
    })
      .then(() => {
        fetchApplications();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <>
      <div className="appHeader">
        <p>My Applications</p>
        <Button
          size="large"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsCreateModalOpen(true)}
        />
      </div>
      {!applications.length && !isListLoading && (
        <div className="emptyState">
          <Empty description="No applications found. Please create a new one" />
        </div>
      )}
      {isListLoading && (
        <div className="loader">
          <Spin size="large" />
        </div>
      )}
      {!isListLoading && (
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
      )}
    </>
  );
}
