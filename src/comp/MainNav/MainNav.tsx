import { NavLink } from "react-router";

import styles from "./MainNav.module.sass";

export default function MainNav() {
  const navLinks = [
    { name: "WORK", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  const languages = [
    {
      name: "Nederlands",
      value: "NL",
      attrib: "nl",
      label: "Overschakelen naar de Nederlandse versie van de website",
    },
    {
      name: "English",
      value: "EN",
      attrib: "en",
      label: "Switch to the English version of the website",
    },
    {
      name: "Français",
      value: "FR",
      attrib: "fr",
      label: "Passer à la version française du site",
    },
  ];

  return (
    <header>
      <nav className="nav">
        <NavLink to={"/"} key="logo" className={styles.logo}>
          ALEX MOZAGBA
        </NavLink>
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
            <button lang={lang.attrib} aria-label={lang.label}>
              {lang.value}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
}
