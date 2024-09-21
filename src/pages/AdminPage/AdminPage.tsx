import React from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

const AdminPage: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AdminPage;
 