import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminPage: React.FC = () => {
  return (
    <div>
      Admin Page
      <Link to="groups">Groups</Link>
      <Link to="payment">Payment</Link>
      <Link to="events">Schedule</Link>
      <Outlet />
    </div>
  );
};

export default React.memo(AdminPage);
