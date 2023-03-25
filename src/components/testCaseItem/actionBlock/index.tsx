import {  Collapse, Select } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Service } from "../../../service";
import { Endpoint } from "../../../service/endpoint";
import "../style.css";

const { Panel } = Collapse;

export function ActionBlock() {
    const { id = "" } = useParams();
    const [actionGroups, setActionGroups] = useState([]);
    const [selectedAction, setSelectedAction] = useState([]);
    const fetchActionGroups = async () => {
      await Service.get(Endpoint.v1.group.getList(id))
        .then((data) => {
          console.log("DEBUG", data);
  
          setActionGroups(data);
        })
        .finally(() => {});
    };
  
    useEffect(() => {
      fetchActionGroups();
    }, []);
  
    const handleChange = (val: any) => {
      setSelectedAction(val);
    };
  
    return (
      <div>
        <Collapse style={{ backgroundColor: "#CAD5E2" }}>
          <Panel header="Action" key="1">
            <Select
              style={{ width: "100%" }}
              placeholder="Select an action"
              onChange={handleChange}
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
                { value: "disabled", label: "Disabled", disabled: true }
              ]}
            />
          </Panel>
        </Collapse>
      </div>
    );
  }
  