import { NavLink } from "react-router";

import styles from "./MainNav.module.sass";

export default function MainNav() {
  const navLinks = [
    { name: "WORK", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  const languages = [
    { name: "Nederlands", value: "NL" },
    { name: "English", value: "EN" },
    { name: "Français", value: "FR" },
  ];

  return (
    <header>
      <nav className="nav">
        <h2 key="logo" className={styles.logo}>
          ALEX MOZAGBA
        </h2>
        <ul key="nav-list" aria-label="main navigation">
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
      <ul className={styles.langCont}>
        {languages.map((lang) => (
          <li key={lang.name}>
            <button>{lang.value}</button>
          </li>
        ))}
      </ul>
    </header>
  );
}
