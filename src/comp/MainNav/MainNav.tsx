import { NavLink } from "react-router";
import { gsap } from "gsap";
import styles from "./MainNav.module.sass";
import { useEffect, useRef, useState } from "react";

export default function MainNav() {
  const []
  const [menuText, setMenuText] = useState("MENU");
  const [isClicked, setIsClicked] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null)

  let tl = gsap.timeline();

  useEffect(() => {
    console.log(isClicked)
    setMenuText(isClicked ? "CLOSE" : "MENU");
    if (width <= 500) {
      isClicked ? tl.to(headerRef?.current, { duration: 0.5, height: '14rem' }) : tl.to(headerRef?.current, { duration: 0.5, height: '1.65rem' });
    } else if (width > 500 && width <= 1024) {
      isClicked ? tl.to(headerRef?.current, { duration: 0.5, height: '10.485rem' }) : tl.to(headerRef?.current, { duration: 0.5, height: '1.65rem' });
    } else {

    }
  }, [isClicked, width]);

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
      window.removeEventListener("click", (e) => {
        if (e.target !== menuBtnRef.current) {
          setIsClicked(false);
        }
      });
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
    setHeight(window.innerHeight);
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
    !isClicked && width < 1025 ? styles.inactive : styles.langCont;

  return (
    <header ref={headerRef} >
      <nav className="nav">
        <NavLink ref={logoRef} to={"/"} key="logo" className={styles.logo}>
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
    </header >
  );
}
