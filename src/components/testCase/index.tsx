import { useEffect, useState } from "react";
import { TestCaseItem, TEST_CASE_ITEMS } from "../testCaseItem";
import "./style.css";

let MOCK_DATA = [
  {
    type: TEST_CASE_ITEMS.ACTION,
    value: {}
  },
  {
    type: TEST_CASE_ITEMS.ASSERT,
    value: {}
  },
  {
    type: TEST_CASE_ITEMS.IF,
    value: {}
  }
];

function insert(i: number, arr: any, ...rest: any) {
  arr.splice(i, 0, ...rest);
  return arr;
}
export function TestCase() {
  const [testcaseData, setTestCaseData] = useState([] as any);
  useEffect(() => {
    setTestCaseData(MOCK_DATA);
  }, []);
  return (
    <div className="testCaseContainer">
      <div className="connectingLine"></div>
      {testcaseData.map((data: any, index: any) => (
        <>
          <TestCaseItem  type={data.type} />
          <TestCaseItem
            handleMenuClick={(val: any) =>
              setTestCaseData(
                insert(index + 1, [...testcaseData], { type: val.key })
              )
            }
            type={TEST_CASE_ITEMS.ADD}
          />
        </>
      ))}
    </div>
  );
}
