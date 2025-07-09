import { NavLink } from "react-router";
import { gsap } from "gsap";
import styles from "./MainNav.module.sass";
import { useEffect, useRef, useState } from "react";

export default function MainNav() {
  const [isHovered, setIsHovered] = useState(false)
  const [shapeX, setShapeX] = useState("0")
  const [menuText, setMenuText] = useState("MENU");
  const [isClicked, setIsClicked] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const hShapeRef = useRef<HTMLDivElement>(null);
  const navLinkRef = useRef<HTMLLIElement>(null);

  let tl = gsap.timeline();

  useEffect(() => {


    return () => {

    }
  }, [isHovered, width, isClicked]);

  useEffect(() => {
    setMenuText(isClicked ? "CLOSE" : "MENU");

    const heEl = headerRef?.current;
    if (!heEl) return;
    tl.clear();

    if (width < 500) {
      isClicked ? tl.to(heEl, { duration: 0.3, height: '14rem' }) : tl.to(heEl, { duration: 0.3, height: '1.7rem' });

    } else if (width >= 500 && width <= 1024) {
      isClicked ? tl.to(heEl, { duration: 0.3, height: '10.485rem' }) : tl.to(heEl, { duration: 0.3, height: '1.7rem' });

    } else if (width > 1024 && !isClicked && heEl) {
      tl.to(heEl, { duration: 0.3, height: '2.25rem' });

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
  };

  function handleScroll() {
    setIsClicked(false);
  };

  function menuBtnClick(e) {
    setIsClicked((c) => !c);
  };

  // function handleHover(e) {
  //   setIsHovered(true)
  //   console.log(e.target.getBoundingClientRect().left)
  // };

  function handleUnhover() {
    if (hShapeRef?.current && headerRef?.current) {
      tl.clear()
    }
  };

  function handleHover(e) {
    if (hShapeRef?.current && headerRef?.current) {
      // let rspSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
      let rspSize = headerRef.current.getBoundingClientRect().left + 0.125 * parseFloat(getComputedStyle(document.documentElement).fontSize) + 1.25;
      const hShape = hShapeRef.current;
      const hoveredEl = e.target;

      let xPos = hoveredEl.getBoundingClientRect().left - rspSize;
      let yPos = hoveredEl.getBoundingClientRect().top;
      let w = hoveredEl.offsetWidth + 5;
      let h = hoveredEl.offsetHeight;


      tl.clear()
      tl.to(hShape, { duration: 0.3, left: xPos, top: '0' })
        .to(hShape, { duration: 0.15, width: w, height: '100%' }, 0.15);
    }
  };


  const showMenu = width <= 1024 ? !isClicked : true;
  const ulClass = showMenu ? `${styles.ul}` : `${styles.activeList}`;
  const langClass =
    !isClicked && width <= 1025 ? styles.inactive : styles.langCont;

  return (
    <header ref={headerRef}>
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
            <li key={link.name}
              ref={navLinkRef}
              onMouseEnter={handleHover}
              onFocus={handleHover}
              onMouseLeave={handleUnhover}
              onBlur={handleUnhover}>
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
