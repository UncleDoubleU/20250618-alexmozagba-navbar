import { NavLink } from "react-router";

import styles from "./MainNav.module.sass";
import { useEffect, useRef, useState } from "react";

export default function MainNav() {
  const [menuText, setMenuText] = useState("MENU");
  const [isClicked, setIsClicked] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMenuText(isClicked ? "CLOSE" : "MENU");
  }, [isClicked]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", (e) => {
      if (e.target !== menuBtnRef.current) {
        setIsClicked(false);
      }
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  function handleResize() {
    setWidth(window.innerWidth);
    setIsClicked(false);
  }

  function handleScroll() {
    setIsClicked(false);
  }

  function menuBtnClick() {
    setIsClicked((c) => !c);
  }

  const showMenu = width <= 1024 ? !isClicked : true;
  const ulClass = showMenu ? `${styles.ul}` : `${styles.activeList}`;
  const langClass =
    !isClicked && width < 1025 ? styles.langContInactive : styles.langCont;

  return (
    <header>
      <nav className="nav">
        <NavLink to={"/"} key="logo" className={styles.logo}>
          ALEX MOZAGBA
        </NavLink>
        <button
          ref={menuBtnRef}
          className={styles.menuBtn}
          onClick={menuBtnClick}
        >
          {menuText}
        </button>
        <ul key="nav-list" aria-label="main navigation" className={ulClass}>
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
      <ul className={langClass}>
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
