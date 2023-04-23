import { Collapse, Select } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Service } from "../../../service";
import { Endpoint } from "../../../service/endpoint";
import "../style.css";

const { Panel } = Collapse;

interface ActionBlockProp {
  selected: string;
}

interface ActionGroup {
  app_id: string;
  description: string;
  id: string;
  name: string;
  type_field: string;
}

export function ActionBlock(props: ActionBlockProp) {
  const { appId = "" } = useParams();
  const [actionGroups, setActionGroups] = useState([] as ActionGroup[]);
  const [selectedAction, setSelectedAction] = useState(props.selected);
  const fetchActionGroups = async () => {
    await Service.get(Endpoint.v1.group.getList(appId))
      .then((data) => {
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
            options={actionGroups.map((actionGroup: ActionGroup) => {
              return { value: actionGroup.id, label: actionGroup.name };
            })}
            value={selectedAction}
          />
        </Panel>
      </Collapse>
    </div>
  );
}
