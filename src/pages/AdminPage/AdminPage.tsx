import React from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

const AdminPage: React.FC = () => {

  return (
    <div >
      СТОРІНКА АДМІНІСТРАЦІЇ
      <ul>
        <li>
          <NavLink to="groups">ГРУПИ</NavLink>
        </li>
        <li>
          <NavLink to="payment">ОПЛАТА</NavLink>
        </li>
        <li>
          <NavLink to="events">РОЗКЛАД</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default AdminPage;
 