import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { fetchAllEvents, fetchAllUsers } from "../../redux/thunks/thunks";

const AdminPage: React.FC = () => {
  const dispatch = useAppDispatch()
useEffect(()=> {
dispatch(fetchAllUsers());
//dispatch(fetchAllEvents())
},[dispatch])
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
 