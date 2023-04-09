import { lazily } from "react-lazily";

/**
 * ROUTES - will have all the route config in orca web app
 */
export const ROUTES = [
  {
    key: "authenticated",
    path: "",
    component: () => {
      const { HomeLayout } = lazily(() => import("layouts/home"));
      return HomeLayout;
    },
    nestedRoute: [
      {
        path: "/app",
        component: () => {
          const { AppLayout } = lazily(() => import("layouts/app"));
          return AppLayout;
        },
        nestedRoute: [
          {
            path: ":appId",
            component: () => {
              const { AppDashboard } = lazily(
                () => import("pages/app/dashboard")
              );
              return AppDashboard;
            }
          },
          {
            path: ":appId/dashboard",
            component: () => {
              const { AppDashboard } = lazily(
                () => import("pages/app/dashboard")
              );
              return AppDashboard;
            }
          },
          {
            path: ":appId/testsuite",
            component: () => {
              const { TestSuiteDashboard } = lazily(
                () => import("pages/app/suite/list")
              );
              return TestSuiteDashboard;
            }
          },
          {
            path: ":appId/testsuite/:testSuiteId",
            component: () => {
              const { TestSuiteDashboard } = lazily(
                () => import("pages/app/suite/list")
              );
              return TestSuiteDashboard;
            }
          },
          {
            path: ":appId/actiongroup",
            component: () => {
              const { ActionGroupDashboard } = lazily(
                () => import("pages/app/action_group/list")
              );
              return ActionGroupDashboard;
            }
          },
          {
            path: ":appId/actiongroup/:actionGroupId",
            component: () => {
              const { Action } = lazily(
                () => import("pages/app/action_group")
              );
              return Action;
            }
          },
          {
            path: ":appId/testcase",
            component: () => {
              const { TestCaseDashboard } = lazily(
                () => import("pages/app/case/list")
              );
              return TestCaseDashboard;
            }
          },
          {
            path: ":appId/testcase/:testCaseId",
            component: () => {
              const { Action } = lazily(
                () => import("pages/app/action_group")
              );
              return Action;
            }
          }
        ]
      },
      {
        path: "/",
        component: () => {
          const { Home } = lazily(() => import("pages/home"));
          return Home;
        },
        nestedRoute: []
      }
    ]
  },
  {
    key: "public",
    path: "/auth",
    component: () => {
      const { AuthLayout } = lazily(() => import("layouts/auth"));
      return AuthLayout;
    },
    nestedRoute: [
      {
        path: "login",
        component: () => {
          const { Login } = lazily(() => import("pages/auth/login/login"));
          return Login;
        }
      }
    ]
  }
];
