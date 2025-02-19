import { useState } from "react";
import { Link } from "react-router-dom";
import cls from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import { Navigate } from "react-big-calendar";

const links = [
  { href: "#about", label: "О нас" },
  //{ href: "#services", label: "Услуги" },
  { href: "#schedule", label: "Расписание" },
  { href: "#pricing", label: "Цены" },
  // { href: "#reviews", label: "Отзывы" },
  { href: "#gallery", label: "Галерея" },
  { href: "#contacts", label: "Контакты" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

  const closeBurger = () => {
    if(isOpen){
      setIsOpen(false)
    }
    return
  }
  


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
 

  return (
    <header className={cls.header}>
      <div className={cls.logo} > <NavLink className={cls.logo} to="/" onClick={toggleMenu}>Uken</NavLink></div>
      <div className={cls.burger} onClick={toggleMenu}>
        <div className={cls.line}></div>
        <div className={cls.line}></div>
        <div className={cls.line}></div>
      </div>
      <nav className={`${cls.nav} ${isOpen ? cls.open : ""}`} onClick={toggleMenu}>
      {!isAdmin &&  <ul className={cls.navList}>
          {links.map((link) => (
            <li key={link.href}>
              <a className={cls.link} href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <NavLink className={cls.link} to="/">
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink className={cls.link} to="/admin">
              Админ
            </NavLink>
          </li>
          </ul>}
       {isAdmin &&   <ul className={cls.navList}>
        <NavLink className={cls.link} to="/" onClick={toggleMenu}>
              ГОЛОВНА
            </NavLink>
            <li>
              <NavLink  className={cls.link}  to="/admin" onClick={toggleMenu}>АДМІСТРАТОР</NavLink>
            </li>
          </ul>}       
      </nav>
    </header>
  );
};
