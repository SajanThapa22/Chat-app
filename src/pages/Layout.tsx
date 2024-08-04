import { Outlet } from "react-router-dom";
import ChatUI from "./chatUI";

const Layout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;
