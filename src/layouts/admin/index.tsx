import { AcademicCapIcon, UserIcon } from "@heroicons/react/outline";
import { lazily } from "react-lazily";
import { Link, Outlet } from "react-router-dom";
import { TopFrame } from "../../components/topframe";

export const ADMIN_ROUTES = [
    {
      key: "userManagement",
      path: "user",
      component: () => {
        const { UserManagement } = lazily(() => import("../../pages/admin/user"));
        return UserManagement;
      },
      isMenu: true,
      name: "User Management",
      icon: UserIcon,
      relativePath: "/admin/user"
    },
    {
      key: "roleManagement",
      path: "role",
      component: () => {
        const { RoleManagement } = lazily(() => import("../../pages/admin/role"));
        return RoleManagement;
      },
      name: "Role Management",
      isMenu: true,
      icon: AcademicCapIcon,
      relativePath: "/admin/role"
    }
  ];
  

export function AdminLayout() {
  return (
    <div className="flex w-screen h-screen">
      <div className="w-60 shadow-md bg-white" id="sidenavSecExample">
        <div className="pt-4 pb-2 px-6">
          <div className="flex items-center">
            <div className="shrink-0">
            </div>
            <div className="grow ml-3">
              <p className="text-sm font-semibold text-blue-600">
                Admin Settings
              </p>
            </div>
          </div>
        </div>
        <hr className="my-2" />
        <ul className="relative px-1">
          {ADMIN_ROUTES.map((item: any) => {
            if (item.isMenu)
              return (
                <li className="relative" key={item.key}>
                  <Link
                    to={item.relativePath}
                    className="flex space-x-4 items-center text-sm py-4 px-5 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="primary"
                  >
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            return null;
          })}
        </ul>
      </div>

      <Outlet />
    </div>
  );
}