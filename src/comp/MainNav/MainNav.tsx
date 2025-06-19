import { NavLink } from "react-router";
import styles from "./MainNav.module.sass";
import { useState, useEffect } from "react";

export default function MainNav() {
  const [width, setWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "WORK", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <nav className="nav">
      <h1 className={styles.logo}>ALEX MOZAGBA</h1>
      <ul aria-label="main navigation">
        {navLinks.map((link) => (
          <li key={link.name}>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.activeLink}` : `${styles.a}`
              }
              to={link.path}
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
