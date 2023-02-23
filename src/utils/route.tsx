import { lazily } from "react-lazily";

/**
 * ROUTES - will have all the route config in orca web app
 */
export const ROUTES = [
  {
    key: "authenticated",
    path: "",
    component: () => {
      const { HomeLayout } = lazily(() => import("../layouts/home"));
      return HomeLayout;
    },
    nestedRoute: [
      {
        path: "/app",
        component: () => {
          const { AppLayout } = lazily(() => import("../layouts/app"));
          return AppLayout;
        },
        nestedRoute: [
          {
            path: ":id/",
            component: () => {
              const { AppDashboard } = lazily(
                () => import("../pages/app/dashboard")
              );
              return AppDashboard;
            }
          },
          {
            path: ":id/actiongroup",
            component: () => {
              const { ActionGroup } = lazily(
                () => import("../pages/action_group/index")
              );
              return ActionGroup;
            }
          },
          {
            path: ":id/actiongroup/:action",
            component: () => {
              const { Action } = lazily(
                () => import("../pages/action_group/action")
              );
              return Action;
            }
          }
        ]
      },
      {
        path: "/",
        component: () => {
          const { Home } = lazily(() => import("../pages/home"));
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
      const { AuthLayout } = lazily(() => import("../layouts/auth"));
      return AuthLayout;
    },
    nestedRoute: [
      {
        path: "login",
        component: () => {
          const { Login } = lazily(() => import("../pages/auth/login/login"));
          return Login;
        }
      }
    ]
  },
  {
    key: "admin",
    path: "/admin",
    component: () => {
      const { AdminLayout } = lazily(() => import("../layouts/admin"));
      return AdminLayout;
    },
    nestedRoute: [
      {
        path: "usermanagement",
        component: () => {
          const { UserManagement } = lazily(
            () => import("../pages/admin/user")
          );
          return UserManagement;
        }
      },
      {
        path: "rolemanagement",
        component: () => {
          const { RoleManagement } = lazily(
            () => import("../pages/admin/role")
          );
          return RoleManagement;
        }
      }
    ]
  }
];
