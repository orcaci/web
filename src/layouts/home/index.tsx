import { Outlet } from "react-router-dom";
import { TopNav } from "../../components/topnav";

export function HomeLayout() {
  return (
    <>
      <TopNav />
      <div className="relative top-12 p-3">
        <Outlet />
      </div>
    </>
  );
}
