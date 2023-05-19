import { useEffect } from "react";
import { TestCase } from "../../components/testCase";
import { useParams } from "react-router-dom";
import { useTestCaseStore } from "store/testCaseStore";
import { PageHeader } from "components/pageHeader";
import { shallow } from "zustand/shallow";

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

  const name = useTestCaseStore((state) => state.name, shallow);

  useEffect(() => {
    useTestCaseStore.getState().loadData(appId, testCaseId);
  }, [appId, testCaseId]);

  return (
    <>
      <PageHeader backIcon title={name} />
      <TestCase />
    </>
  );
}
