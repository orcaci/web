import { Select } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Service } from "../../../service";
import { Endpoint } from "../../../service/endpoint";
import "../style.css";
import { useTestCaseStore } from "stores/testcase.store";

interface ActionBlockProp {
  selected: string;
  id: string;
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
  const updateBlock = async (groupId: string) => {
    useTestCaseStore
      .getState()
      .updateActionBlock({ groupId, actionId: props.id });
  };

  useEffect(() => {
    const fetchActionGroups = async () => {
      await Service.get(Endpoint.v1.group.getList(appId))
        .then((data) => {
          setActionGroups(data);
        })
        .finally(() => {});
    };
    fetchActionGroups();
  }, []);

  const handleChange = (val: string) => {
    setSelectedAction(val);
    updateBlock(val);
  };

  return (
    <Select
      style={{ width: "100%" }}
      placeholder="Select an action"
      onChange={handleChange}
      options={actionGroups.map((actionGroup: ActionGroup) => {
        return { value: actionGroup.id, label: actionGroup.name };
      })}
      value={selectedAction}
    />
  );
}
