import React from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

const AdminPage: React.FC = () => {
  return (
    <div>
      Admin Page
      <ul>
        <li>
          <NavLink to="groups">Groups</NavLink>
        </li>
        <li>
          <NavLink to="payment">Payment</NavLink>
        </li>
        <li>
          <NavLink to="events">Schedule</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default AdminPage;
