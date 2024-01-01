import { PlayCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { PageHeader } from "components/page_header";
import { TEST_CASE_BLOCKS, TestCaseBlock } from "components/testcase_blocks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Service } from "service";
import { Endpoint } from "service/endpoint";
import { useTestCaseStore } from "stores/testcase.store";
import { shallow } from "zustand/shallow";

import { Workflow } from "components/flow";

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
  const [dataSource, setDataSource] = useState([] as any);
  const [nodes, setNode] = useState([] as any);
  const [edges, setEdges] = useState([] as any);

  const fetchTestCase = async () => {
    await Service.get(`${Endpoint.v1.case.itemList(appId, testCaseId)}`)
      .then((caseblock) => {
        setDataSource(caseblock);
        constructWorkflow(caseblock);
      })
      .finally(() => {});
  };
  const constructWorkflow = (caseblock: any) => {
    let node: Array<any> = [];
    let edge: Array<any> = [];
    let currentEdge: any = undefined;
    // dataSource.forEach((element: { [x: string]: any }) => {
    //   node.push({ id: element["id"] });
    // });
    (caseblock.case_execution || []).map((item: any, index: number) => {
      if (currentEdge != undefined) {
        edge.push({
          ...currentEdge,
          id: `${currentEdge?.id}actionNode${item.id}`,
          target: `actionNode${item.id}`
        });
      }
      node.push({
        id: `actionNode${item.id}`,
        type: "actionNode",
        position: { x: 0, y: 300 * index },
        data: { payload: item }
      });
      edge.push({
        id: `actionNode${item.id}_to_addNew${item.id}`,
        type: "defaultE",
        source: `actionNode${item.id}`,
        target: `addNew${item.id}`
      });
      node.push({
        id: `addNew${item["id"]}`,
        type: "newNode",
        position: { x: 178, y: 300 * index + 150 },
        data: {}
      });
      currentEdge = {
        id: `actionNode${item.id}_to_`,
        type: "defaultE",
        source: `addNew${item.id}`
      };
    });
    console.log("edge", edge);
    console.log("node", node);
    setNode(node);
    setEdges(edge);
  };

  useEffect(() => {
    fetchTestCase();
  }, [appId]);

  const { name, hasData } = useTestCaseStore(
    (state) => ({ name: state.name, hasData: state.case_execution.length > 0 }),
    shallow
  );

  const [isRunning, setIsRunning] = useState(false);

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
      <Workflow nodes={nodes} edges={edges}></Workflow>
    </>
  );
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

  return <div></div>;
}
