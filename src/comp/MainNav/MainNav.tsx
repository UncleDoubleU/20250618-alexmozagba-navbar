import { NavLink } from "react-router";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./MainNav.module.sass";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

export default function MainNav() {

  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const menuBtnRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<SVGRectElement>(null);
  const midBarRef = useRef<SVGRectElement>(null);
  const bottomBarRef = useRef<SVGRectElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const hShapeRef = useRef<HTMLDivElement>(null);
  const navLinkRef = useRef<HTMLLIElement>(null);
  // let rspSize
  // let xPos

  let tl = gsap.timeline();

  // useGSAP(() => {
  //   const heEl = headerRef?.current;
  //   if (!heEl) return;
  //   tl.clear();

  //   if (width <= 500) {
  //     isClicked ? tl.to(heEl, { duration: 0.3, height: '12.85rem' }) : tl.to(heEl, { duration: 0.3, height: '1.7rem' });

  //   } else if (width > 500 && width <= 1024) {
  //     isClicked ? tl.to(heEl, { duration: 0.3, height: '11.5rem' }) : tl.to(heEl, { duration: 0.3, height: '1.7rem' });

  //   } else if (width > 1024 && !isClicked && heEl) {
  //     tl.to(heEl, { duration: 0.3, height: '2.25rem' });

  //   }

  // }, [isClicked, width])

  // useGSAP(() => {
  //   // setMenuText(isClicked ? "CLOSE" : "MENU");

  //   tl.clear()
  //   if (topBarRef?.current && bottomBarRef?.current && midBarRef?.current && isClicked) {
  //     tl.to(topBarRef.current, { duration: 0.3, rotate: 45, y: 7, ease: "power4.inOut" })
  //       .to(midBarRef.current, { duration: 0.3, opacity: 0 }, 0)
  //       .to(bottomBarRef.current, { duration: 0.3, rotate: -45, y: -7, ease: "power4.inOut" }, 0)
  //   };


  // }, { dependencies: [isClicked], scope: menuBtnRef, revertOnUpdate: true });



  useEffect(() => {


    window.addEventListener("resize", handleResize);
    window.addEventListener("click", (e) => {
      if (menuBtnRef?.current && !menuBtnRef.current.contains(e.target as Node)) {
        setIsClicked(false);
        console.log(e.target)
      }
    });



    return () => {
      window.removeEventListener("resize", handleResize);
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

  function menuBtnClick() {
    setIsClicked((c) => !c);
  };

  // function expandMenu() {
  //   if (topBarRef?.current && bottomBarRef?.current && midBarRef?.current) {
  //     tl.to(topBarRef.current, { duration: 0.3, rotate: 45, y: 7, ease: "power4.inOut" })
  //       .to(midBarRef.current, { duration: 0.3, opacity: 0 }, 0)
  //       .to(bottomBarRef.current, { duration: 0.3, rotate: -45, y: -7, ease: "power4.inOut" }, 0)
  //   };
  // }
  // function colapseMenu() {
  //   if (topBarRef?.current && bottomBarRef?.current && midBarRef?.current) {
  //     tl.to(topBarRef.current, { duration: 0.3, rotate: -45, y: 7, ease: "power4.inOut" })
  //       .to(midBarRef.current, { duration: 0.3, opacity: 1 }, 0)
  //       .to(bottomBarRef.current, { duration: 0.3, rotate: 45, y: -7, ease: "power4.inOut" }, 0)
  //   };
  // }



  const showMenu = width <= 1024 ? !isClicked : true;
  const ulClass = showMenu ? `${styles.ul}` : `${styles.expandedNav}`;
  const langClass =
    !isClicked && width <= 1025 ? styles.inactive : styles.langCont;

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
          >
            <g transform="translate(0, 0)">
              <rect ref={topBarRef} width="100%" height="3" x="0" y="0" fill="#1A56FF" stroke="none" />
              <rect ref={midBarRef} width="100%" height="3" x="0" y="8" fill="#1A56FF" stroke="none" />
              <rect ref={bottomBarRef} width="100%" height="3" x="0" y="16" fill="#1A56FF" stroke="none" />
            </g>
          </svg>
        </div>

        <ul key="nav-list" aria-label="main navigation" className={ulClass}>
          {navLinks.map((link) => (
            <li key={link.name}
              ref={navLinkRef}

            // onMouseLeave={handleUnhover}
            // onBlur={handleUnhover}
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
