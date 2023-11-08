import React from "react";
import { Outlet, useMatch, useNavigate, useParams } from "react-router-dom";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import {
  PlayCircleOutlined,
  ExperimentOutlined,
  GroupOutlined,
  DatabaseOutlined,
  DashboardOutlined,
  ReconciliationOutlined,
  TransactionOutlined,
  InteractionOutlined
} from "@ant-design/icons";
import "../layout.css";
import {
  ChartPieIcon,
  PresentationChartLineIcon,
  RectangleGroupIcon,
  FunnelIcon,
  TableCellsIcon,
  BookOpenIcon,
  BriefcaseIcon
} from "@heroicons/react/24/outline";

const { Content, Sider } = Layout;

export function AppLayout() {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: ChartPieIcon,
      isActive: true
    },
    {
      key: "actiongroup",
      label: "Action Group",
      icon: BriefcaseIcon
    },
    {
      key: "testsuite",
      label: "Test Suite",
      icon: RectangleGroupIcon
    },
    {
      key: "testcase",
      label: "Test Case",
      icon: FunnelIcon
    },
    {
      key: "datatable",
      label: "Data table",
      icon: TableCellsIcon
    },
    {
      key: "log",
      label: "Log",
      icon: BookOpenIcon,
      children: [
        {
          key: "execution",
          label: "Exectution log",
          icon: <TransactionOutlined />
        },
        {
          key: "activity",
          label: "Activity log",
          icon: <InteractionOutlined />
        }
      ]
    }
  ];
  const { appId } = useParams();
  const match = useMatch({ path: "/app/:appId/*" });
  const selectedRoute = match?.params["*"]?.split("/")[0] || "dashboard";

  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {menuItems.map((menu: any) => {
              let cls = "flex-1 ml-3 whitespace-nowrap";
              let prCls =
                "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ";
              if (menu.isActive) {
                cls = cls + " text-indigo-600";
                prCls = prCls + " bg-gray-100";
              }
              return (
                <li>
                  <a
                    href="#"
                    onClick={() => navigate(`${appId}/${menu.key}`)}
                    className={prCls}
                  >
                    <menu.icon className="h-6 w-6 text-indigo-600" />
                    <span className={cls}>{menu.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
      <div className="mx-auto max-w-7xl pt-20 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </>
  );
}
