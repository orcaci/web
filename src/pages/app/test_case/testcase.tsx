import { PageHeader } from "components/page_header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Service } from "service";
import { Endpoint } from "service/endpoint";
import { useTestCaseStore } from "stores/testcase.store";
import { shallow } from "zustand/shallow";

import { PlayCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
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
  const generateNodeAndEdge = (
    input: Array<any>,
    nodes: Array<any>,
    edges: Array<any>,
    derivedEdge: any = undefined
  ) => {
    input.map((item: any, index: number) => {
      const current_item = item[0];
      if (derivedEdge != undefined) {
        edges.push({
          ...derivedEdge,
          id: `${derivedEdge?.id}_to_actionNode${current_item.id}`,
          target: `actionNode${current_item.id}`
        });
      }
      nodes.push({
        id: `actionNode${current_item.id}`,
        type: "actionNode",
        position: { x: 0, y: 300 * index },
        data: { payload: current_item }
      });
      derivedEdge = {
        id: `actionNode${current_item.id}`,
        type: "defaultE",
        source: `actionNode${current_item.id}`
      };
      const child = item[1];
      if (child != undefined && child.length > 0) {
        // generateNodeAndEdge(child, )
      }
    });
  };
  /**
   * Added the Only the new node here for the New Workflow
   */
  const addNewNode = (nodes: Array<any>) => {
    nodes.push({
      id: "addNode",
      type: "newNode",
      position: { x: 0, y: 300 },
      data: {}
    });
  };

  const constructWorkflow = (caseblock: any) => {
    const nodes: Array<any> = [];
    const edges: Array<any> = [];
    const currentEdge: any = undefined;
    generateNodeAndEdge(caseblock.case_execution || [], nodes, edges);
    if (nodes.length == 0) {
      addNewNode(nodes);
    }

    console.log("edge", edges);
    console.log("node", nodes);
    setNode(nodes);
    setEdges(edges);
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
          <div className=" flex items-center gap-3">
            <Button
              variant="gradient"
              className="flex items-center gap-3"
              onClick={handleRun}
              color="indigo"
            >
              <PlayCircleIcon className="size-4" /> Dry Run
            </Button>
          </div>
        }
      />
      <Workflow nodes={nodes} edges={edges}></Workflow>
    </>
  );
}
