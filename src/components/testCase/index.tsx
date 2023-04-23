import { useEffect, useState } from "react";
import { TestCaseItem, TEST_CASE_ITEMS } from "../testCaseItem";
import "./style.css";
import { TestCaseexecutionItem } from "../../pages/test_case";

function insert(i: number, arr: any, ...rest: any) {
  arr.splice(i, 0, ...rest);
  return arr;
}

interface TestCaseProp {
  data: TestCaseexecutionItem[];
}

export function TestCase(prop: TestCaseProp) {
  const [testcaseData, setTestCaseData] = useState(
    [] as TestCaseexecutionItem[]
  );

  useEffect(() => {
    setTestCaseData(prop.data);
  }, [prop.data]);

  if (!testcaseData?.length) {
    return (
      <div className="testCaseContainer">
        No data found
        <TestCaseItem
          handleMenuClick={(val: any) => {
            setTestCaseData(
              insert(0 + 1, [...testcaseData], { type_field: val.key })
            );
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
            />
            <TestCaseItem
              key={`${data.case_id}-add`}
              handleMenuClick={(val: any) => {
                setTestCaseData(
                  insert(index + 1, [...testcaseData], { type_field: val.key })
                );
              }}
              type={TEST_CASE_ITEMS.ADD}
            />
          </>
        ))}
    </div>
  );
}
