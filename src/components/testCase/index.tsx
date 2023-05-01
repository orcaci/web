import { shallow } from "zustand/shallow";
import { TestCaseItem, TEST_CASE_ITEMS } from "../testCaseItem";
import "./style.css";
import { TestCaseData, TestCaseexecutionItem } from "../../pages/test_case";
import { useTestCaseStore } from "store/testCaseStore";

export function TestCase() {

  const { case_execution: testcaseData } = useTestCaseStore(
    (state: TestCaseData) => ({
      case_execution: state.case_execution
    }),
    shallow
  );

  if (!testcaseData?.length) {
    return (
      <div className="testCaseContainer">
        No data found
        <TestCaseItem
          handleMenuClick={(val: any) => {
            useTestCaseStore.getState().addBlock(1, val.key);
          }}
          type={TEST_CASE_ITEMS.ADD}
        />
      </div>
    );
  }

  return (
    <div className="testCaseContainer">
      <div className="connectingLine"></div>
      {testcaseData &&
        testcaseData.map((data: TestCaseexecutionItem, index: number) => (
          <>
            <TestCaseItem
              key={data.case_id}
              selected={data.reference}
              type={data.type_field}
              id={data.id}
              handleMenuClick={() => {}}
            />
            <TestCaseItem
              key={`${data.case_id}-add`}
              handleMenuClick={(val: any) => {
                useTestCaseStore.getState().addBlock(index + 1, val.key);
              }}
              type={TEST_CASE_ITEMS.ADD}
            />
          </>
        ))}
    </div>
  );
}
