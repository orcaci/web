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
                            const { AppDashboard } = lazily(() => import("../pages/app/dashboard"));
                            return AppDashboard;
                        },
                    },
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
            const { AdminLayout } = lazily(() => import("../layouts/admin"));
            return AdminLayout;
        },
        nestedRoute: [
            {
                path: "login",
                component: () => {
                    const { UserManagement } = lazily(() => import("../pages/admin/user"));
                    return UserManagement;
                },
            }
        ]
    }
]