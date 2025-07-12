import { NavLink } from "react-router";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./MainNav.module.sass";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

export default function MainNav() {
  const [navListClass, setNavListClass] = useState(`${styles.ul}`)
  const [langClass, setLangClass] = useState(`${styles.langCont}`)
  const [isClicked, setIsClicked] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const menuBtnRef = useRef<HTMLDivElement>(null);
  const menuVectorRef = useRef<SVGSVGElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const hShapeRef = useRef<HTMLDivElement>(null);
  const navLinkRef = useRef<HTMLLIElement>(null);

  let tl

  useEffect(() => {
    menuAnim()

  }, [isClicked, width])


  useEffect(() => {


    window.addEventListener("resize", handleResize);
    window.addEventListener("pointerdown", handleClickOuside);
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleEnter);


    return () => {
      window.removeEventListener("resize", handleResize);
      window.addEventListener("pointerdown", handleClickOuside);
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("keydown", handleEnter);
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
    console.log(isClicked, width)

  };

  function menuBtnClick(e: MouseEvent) {
    e.preventDefault()
    setIsClicked((c) => !c);

  };

  function handleClickOuside(e: MouseEvent) {
    e.preventDefault()
    if (menuBtnRef?.current && !menuBtnRef.current.contains(e.target as Node)) {
      setIsClicked(false);
    }
  };
  function handleEnter(e: KeyboardEvent) {
    if (menuBtnRef?.current && e.key === 'Enter' && menuBtnRef.current.contains(e.target as Node)) {
      setIsClicked((c) => !c);
    }
  };

  function handleEscape(e: KeyboardEvent) {
    if (headerRef?.current && e.key === 'Escape' && headerRef.current.contains(e.target as Node)) {
      setIsClicked(false);
    }
  };

  function menuAnim() {
    setNavListClass(isClicked ? `${styles.expandedNav}` : `${styles.ul}`)
    setLangClass(!isClicked && width <= 1024 ? styles.inactive : styles.langCont)
  }



  // const showMenu = width <= 1024 ? isClicked : true;

  // const langClass = !isClicked && width <= 1025 ? styles.inactive : styles.langCont;


  return (
    <header ref={headerRef}>
      <nav className="nav">
        <NavLink ref={logoRef} to={"/"} key="logo" className={styles.logo}>
          ALEX MOZAGBA
        </NavLink>
        <div
          role="button"
          aria-label="menu"
          ref={menuBtnRef}
          className={styles.menuBtn}
          onClick={menuBtnClick}
          tabIndex={0}>
          <svg
            width="25"
            height="19"
            viewBox="0 0 25 19"
            xmlns="http://www.w3.org/2000/svg"
            ref={menuVectorRef}
          >
            <g transform="translate(0, 0)">
              <rect className="topBar" width="100%" height="3" x="0" y="0" fill="#1A56FF" stroke="none" />
              <rect className="midBar" width="100%" height="3" x="0" y="8" fill="#1A56FF" stroke="none" />
              <rect className="bottomBar" width="100%" height="3" x="0" y="16" fill="#1A56FF" stroke="none" />
            </g>
          </svg>
        </div>

        <ul key="nav-list" aria-label="main navigation" className={navListClass}>
          {navLinks.map((link) => (
            <li key={link.name}
              ref={navLinkRef}
            >
              <NavLink
                className={styles.a}
                to={link.path}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div ref={hShapeRef} className={styles.hoverShape}></div>
      </nav>
      <menu className={langClass}>
        {languages.map((lang) => (
          <li key={lang.name}>
            <button lang={lang.attrib} aria-label={lang.label}>
              {lang.value}
            </button>
          </li>
        ))}
      </menu>
    </header >
  );
}
