import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { fetchAllEvents, fetchAllGroups, fetchAllPayments, fetchAllUsers } from "../../redux/thunks/thunks";
import cls from './AdminPage.module.scss'

const AdminPage: React.FC = () => {
  const dispatch = useAppDispatch()
useEffect(()=> {
dispatch(fetchAllUsers());
dispatch(fetchAllEvents());
dispatch(fetchAllGroups());
dispatch(fetchAllPayments());
},[dispatch])
  return (
    <div className={cls.container} >

    <div className={cls.navContainer}>
    <p className={cls.titleOfAdminPage}> СТОРІНКА АДМІНІСТРАЦІЇ</p>
      <ul className={cls.itemOfNav}>
        <li>
          <NavLink to="groups">ГРУПИ</NavLink>
        </li>
        <li>
          <NavLink to="payment">ОПЛАТА</NavLink>
        </li>
        <li>
          <NavLink to="events">РОЗКЛАД</NavLink>
        </li>
        <li>
          <NavLink to="admStat">СТАТИСТИКА</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
    </div>
  );
};

export default AdminPage;
 