import { ActionBlock } from "./actionBlock";
import { AssertBlock } from "./assertBlock";
import { AddBlock } from "./addBlock";
import { IFBlock } from "./ifBlock";
import "./style.css";
import { IterationBlock } from "./iterationBlock";
import { MenuClickEventHandler } from 'rc-menu/lib/interface'

interface TestCaseItemProp {
  type: string;
  handleMenuClick: MenuClickEventHandler;
  selected?: string;
  id?: string;
}

export function TestCaseItem(props: TestCaseItemProp) {
  let Component = TEST_CASE_ITEM_COMPONENT_MAPPING[props.type];
  return (
    <Component
      id={props.id || ""}
      selected={props.selected || ""}
      handleMenuClick={props.handleMenuClick}
    />
  );
}

export const TEST_CASE_ITEMS = {
  ACTION: "ActionGroup",
  ASSERT: "Assertion",
  IF: "If Block",
  FOR_LOOP: "For Loop",
  ADD: "Add Block"
};

export const TEST_CASE_ITEM_COMPONENT_MAPPING = {
  [TEST_CASE_ITEMS.ACTION]: ActionBlock,
  [TEST_CASE_ITEMS.ASSERT]: AssertBlock,
  [TEST_CASE_ITEMS.ADD]: AddBlock
  // [TEST_CASE_ITEMS.IF]: IFBlock,
  // [TEST_CASE_ITEMS.FOR_LOOP]: IterationBlock
};
