import { PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, Dropdown, Input, MenuProps, Select } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Service } from "../../service";
import { Endpoint } from "../../service/endpoint";
import "./style.css";
const { Panel } = Collapse;

interface TestCaseItemProp {
  type: string;
  handleMenuClick?: any;
}

export function TestCaseItem(props: TestCaseItemProp) {
  let Component = TEST_CASE_ITEM_COMPONENT_MAPPING[props.type];
  return <Component handleMenuClick={props.handleMenuClick} />;
}

export function ActionItem() {
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

export function AssertItem() {
  const [assertData, setAssertData] = useState([] as any);

  const handleChange = (value: string, valueobj: any) => {
    setAssertData({ ...assertData, [valueobj.id]: value });
  };
  const onHandleInputChange = (event: any) => {
    setAssertData({ ...assertData, [event.target.id]: event.target.value });
  };

  return (
    <div>
      <Collapse style={{ backgroundColor: "#CAD5E2" }}>
        <Panel header="Assert" key="1">
          <div className="assertContainer">
            <Select
              defaultValue="relative"
              onChange={handleChange}
              options={[
                { value: "Id", label: "relative", id: "target_kind" },
                { value: "Xpath", label: "xpath", id: "target_kind" },
                { value: "Css", label: "index", id: "target_kind" }
              ]}
            />
            <Input
              placeholder="Please enter target"
              onChange={onHandleInputChange}
              id="target_value"
            />
            <Input
              placeholder="Please enter value"
              onChange={onHandleInputChange}
              id="data_value"
            />
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}

interface AddBlockProps {
  handleMenuClick: any;
}

export function AddBlock(props: AddBlockProps) {
  const items: MenuProps["items"] = [
    {
      label: "Action",
      key: TEST_CASE_ITEMS.ACTION
    },
    {
      label: "Assert",
      key: TEST_CASE_ITEMS.ASSERT
    },
    // {
    //   label: "If Block",
    //   key: TEST_CASE_ITEMS.IF
    // },
    // {
    //   label: "For Loop",
    //   key: TEST_CASE_ITEMS.FOR_LOOP
    // }
  ];

  const menuProps = {
    items,
    onClick: props.handleMenuClick
  };
  return (
    <Dropdown menu={menuProps}>
      <Button style={{ width: "fit-content" }} shape="circle">
        <PlusOutlined />
      </Button>
    </Dropdown>
  );
}

export const TEST_CASE_ITEMS = {
  ACTION: "Action",
  ASSERT: "Assert",
  IF: "If Block",
  FOR_LOOP: "For Loop",
  ADD: "Add Block"
};

export const TEST_CASE_ITEM_COMPONENT_MAPPING = {
  [TEST_CASE_ITEMS.ACTION]: ActionItem,
  [TEST_CASE_ITEMS.ASSERT]: AssertItem,
  [TEST_CASE_ITEMS.ADD]: AddBlock
};
