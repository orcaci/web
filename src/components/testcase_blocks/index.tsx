import { ActionBlock } from "./action_block";
import { AssertBlock } from "./assert_block";
import { AddBlock } from "./add_block";
//import { IFBlock } from "./ifBlock";
import "./style.css";
//import { IterationBlock } from "./iterationBlock";
import { MenuClickEventHandler } from "rc-menu/lib/interface";
import { Collapse } from "antd";
const { Panel } = Collapse;

interface TestCaseBlockProp {
  type: string;
  handleMenuClick?: MenuClickEventHandler;
  selected?: string;
  id: string;
}

export function TestCaseBlock(props: TestCaseBlockProp) {
  const Component = TEST_CASE_BLOCK_COMPONENT_MAPPING[props.type];

  if (props.type === TEST_CASE_BLOCKS.ADD) {
    return (
      <Component
        id={props.id || ""}
        selected={props.selected || ""}
        handleMenuClick={props.handleMenuClick}
      />
    );
  }

  const { header, color } = TEST_CASE_BLOCK_VISUAL_MAPPING[props.type];

  return (
    <Collapse style={{ backgroundColor: color }}>
      <Panel header={header} key={props.id || ""}>
        <Component
          id={props.id || ""}
          selected={props.selected || ""}
          handleMenuClick={props.handleMenuClick}
        />
      </Panel>
    </Collapse>
  );
}

export const TEST_CASE_BLOCKS = {
  ACTION: "ActionGroup",
  ASSERT: "Assertion",
  IF: "If Block",
  FOR_LOOP: "For Loop",
  ADD: "Add Block"
};

export const TEST_CASE_BLOCK_COMPONENT_MAPPING = {
  [TEST_CASE_BLOCKS.ACTION]: ActionBlock,
  [TEST_CASE_BLOCKS.ASSERT]: AssertBlock,
  [TEST_CASE_BLOCKS.ADD]: AddBlock
  // [TEST_CASE_BLOCKS.IF]: IFBlock,
  // [TEST_CASE_BLOCKS.FOR_LOOP]: IterationBlock
};

export const TEST_CASE_BLOCK_VISUAL_MAPPING = {
  [TEST_CASE_BLOCKS.ACTION]: {
    header: "Action",
    color: "#CAD5E2"
  },
  [TEST_CASE_BLOCKS.ASSERT]: {
    header: "Assert",
    color: "rgb(228 244 198)"
  }
  // [TEST_CASE_BLOCKS.IF]: {
  //   header: "Assert",
  //   color: "rgb(228 244 198)"
  // },
  // [TEST_CASE_BLOCKS.FOR_LOOP]: {
  //   header: "Assert",
  //   color: "rgb(228 244 198)"
  // }
};
