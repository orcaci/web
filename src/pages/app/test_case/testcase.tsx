import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { shallow } from "zustand/shallow";
import { useTestCaseStore } from "stores/testcase.store";
import { PageHeader } from "components/page_header";
import { TEST_CASE_BLOCKS, TestCaseBlock } from "components/testcase_blocks";
import { Service } from "service";
import { Endpoint } from "service/endpoint";

import "./style.css";

export interface TestCaseexecutionItem {
  case_id: string;
  execution_order: number;
  id: string;
  kind: string;
  parent_id?: string;
  reference: string;
  type_field: string;
}

export interface TestCaseData {
  id: string;
  name: string;
  description: string;
  app_id: string;
  case_execution: TestCaseexecutionItem[];
}

export function TestCasePage() {
  const { appId = "", testCaseId = "" } = useParams();

  const { name, hasData } = useTestCaseStore(
    (state) => ({ name: state.name, hasData: state.case_execution.length > 0 }),
    shallow
  );

  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    useTestCaseStore.getState().loadData(appId, testCaseId);
  }, [appId, testCaseId]);

  const handleRun = () => {
    setIsRunning(true);
    Service.post(`${Endpoint.v1.case.run(appId, testCaseId)}`).finally(() =>
      setIsRunning(false)
    );
  };

  return (
    <>
      <PageHeader
        backIcon
        title={name}
        extra={
          <Button
            disabled={!hasData}
            loading={isRunning}
            onClick={handleRun}
            type="primary"
          >
            Run <PlayCircleOutlined />
          </Button>
        }
      />
      <TestCase />
    </>
  );
}

function insert(i: number, arr: any, ...rest: any) {
  arr.splice(i, 0, ...rest);
  return arr;
}

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
        <TestCaseBlock
          id="empty"
          handleMenuClick={(val: any) => {
            useTestCaseStore.getState().addBlock(1, val.key);
          }}
          type={TEST_CASE_BLOCKS.ADD}
        />
      </div>
    );
  }

  return (
    <div className="testCaseContainer">
      <div className="connectingLine"></div>
      {testcaseData.map((data: TestCaseexecutionItem, index: number) => (
        <>
          <TestCaseBlock
            key={data.case_id}
            selected={data.reference}
            type={data.type_field}
            id={data.id}
            handleMenuClick={() => {}}
          />
          <TestCaseBlock
            key={`${data.case_id}-add`}
            id={`${data.id}-add`}
            handleMenuClick={(val: any) => {
              if (
                val.key === TEST_CASE_BLOCKS.IF ||
                val.key === TEST_CASE_BLOCKS.FOR_LOOP
              ) {
                const currentValue = useTestCaseStore.getState();
                useTestCaseStore.setState({
                  ...currentValue,
                  case_execution: insert(index + 1, [...testcaseData], {
                    type_field: val.key
                  })
                });
              }
              else{
                useTestCaseStore.getState().addBlock(index + 1, val.key);

              }
            }}
            type={TEST_CASE_BLOCKS.ADD}
          />
        </>
      ))}
    </div>
  );
}
