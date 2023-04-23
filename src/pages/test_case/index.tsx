import { useEffect, useState } from "react";
import { TestCase } from "../../components/testCase";
import { useParams } from "react-router-dom";
import { Service } from "../../service";
import { Endpoint } from "../../service/endpoint";

export interface TestCaseexecutionItem {
  case_id: string;
  execution_order: number;
  id: string;
  kind: string;
  parent_id?: string;
  reference: string;
  type_field: string;
}

interface TestCaseData {
  id: string;
  name: string;
  description: string;
  app_id: string;
  case_execution: TestCaseexecutionItem[];
}

export function TestCasePage() {
  const { appId = "", testCaseId = "" } = useParams();
  const [testcaseData, setTestCaseData] = useState({} as TestCaseData);

  const fetchTestCase = async () => {
    await Service.get(Endpoint.v1.case.itemList(appId, testCaseId))
      .then((data) => {
        setTestCaseData(data);
      })
      .finally(() => {});
  };

  useEffect(() => {
    fetchTestCase();
  }, []);

  return <TestCase data={testcaseData.case_execution} />;
}
