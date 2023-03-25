import { ActionBlock } from "./actionBlock";
import { AssertBlock } from "./assertBlock";
import { AddBlock } from "./addBlock";
import { IFBlock } from "./ifBlock";
import "./style.css";

interface TestCaseItemProp {
  type: string;
  handleMenuClick?: any;
}

export function TestCaseItem(props: TestCaseItemProp) {
  let Component = TEST_CASE_ITEM_COMPONENT_MAPPING[props.type];
  return <Component handleMenuClick={props.handleMenuClick} />;
}



export const TEST_CASE_ITEMS = {
  ACTION: "Action",
  ASSERT: "Assert",
  IF: "If Block",
  FOR_LOOP: "For Loop",
  ADD: "Add Block"
};

export const TEST_CASE_ITEM_COMPONENT_MAPPING = {
  [TEST_CASE_ITEMS.ACTION]: ActionBlock,
  [TEST_CASE_ITEMS.ASSERT]: AssertBlock,
  [TEST_CASE_ITEMS.ADD]: AddBlock,
  [TEST_CASE_ITEMS.IF]: IFBlock
};
