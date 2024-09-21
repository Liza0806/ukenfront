import { useState } from "react";
import { Link } from "react-router-dom";
import cls from './Header.module.scss';

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


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={cls.header}>
      <div className={cls.logo}>Uken</div>
      <div className={cls.burger} onClick={toggleMenu}>
        <div className={cls.line}></div>
        <div className={cls.line}></div>
        <div className={cls.line}></div>
      </div>
      <nav className={`${cls.nav} ${isOpen ? cls.open : ''}`}>
        <ul className={cls.navList}>
          {links.map((link) => (
            <li key={link.href}>
              <a className={cls.link} href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link className={cls.link} to="/">Главная</Link>
          </li>
          <li>
            <Link className={cls.link} to="/admin">Админ</Link>
          </li>
          {/* <li>
            <a href="#contact-form" className={cls.ctaButton}>Записаться на тренировку</a>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};
