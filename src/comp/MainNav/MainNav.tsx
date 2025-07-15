import { NavLink } from "react-router";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./MainNav.module.sass";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

export default function MainNav() {
  const [isClicked, setIsClicked] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const langContRef = useRef<HTMLMenuElement>(null)
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navLinkRef = useRef<HTMLLIElement>(null);
  const tl = useRef<GSAPTimeline | null>(null);

  useLayoutEffect(() => {
    // menuAnim();
    tl.current?.reversed(!isClicked)
  }, [isClicked, width]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("pointerdown", handleClickOuside);
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleEnter);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointerdown", handleClickOuside);
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleEnter);
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

  function handleClickOuside(e: MouseEvent) {
    e.preventDefault();
    if (headerRef?.current && !headerRef.current.contains(e.target as Node)) {
      setIsClicked(false);
    }
  }
  function handleEnter(e: KeyboardEvent) {
    if (
      headerRef?.current &&
      e.key === "Enter" &&
      headerRef.current.contains(e.target as Node)
    ) {
      setIsClicked((c) => !c);
    }
  }

  function handleEscape(e: KeyboardEvent) {
    if (
      headerRef?.current &&
      e.key === "Escape" &&
      headerRef.current.contains(e.target as Node)
    ) {
      setIsClicked(false);
    }
  }

  // function menuAnim() {
  //   setLangClass(
  //     !isClicked && width <= 1024 ? styles.inactive : styles.langCont
  //   );
  // }

  useGSAP(
    () => {
      const navItems = gsap.utils.toArray('.navListItem');

      tl.current = gsap.timeline({
        defaults: {
          duration: 0.3,
          ease: "power4.out"
        }
      })
        .set(headerRef.current, { height: '2.75rem' })
        // .from('.topBar', { rotation: 0, y: 0, transformOrigin: "center center" })
        // .from('.midBar', { opacity: 1 })
        // .from('.bottomBar', { rotation: 0, y: 0, transformOrigin: "center center" })
        // .from(headerRef.current, { height: "2.75rem" })
        // .from(navItems, { opacity: 0, stagger: .075 })

        .to('.topBar', { rotation: 45, y: 8, transformOrigin: "center center" })
        .fromTo('.midBar', { opacity: 1 }, { opacity: 0 }, "<")
        .to('.bottomBar', { rotation: -45, y: -8, transformOrigin: "center center" }, "<")
        .to(headerRef.current, {
          height: () => (
            width <= 500 ? "15rem" : "12.5rem"
          )
        }, 0)
        .fromTo(navItems, { opacity: width <= 1024 ? 0 : 1 }, { opacity: 1, stagger: .075 }, ">")
        .fromTo(langContRef?.current, { opacity: width <= 1024 ? 0 : 1 }, { opacity: 1 }, "<+0.15")
        .reverse();

    },
    {
      scope: headerRef,
      dependencies: [width],
      revertOnUpdate: true,
    });

  return (
    <header ref={headerRef}>
      <nav className="nav">
        <NavLink ref={logoRef} to={"/"} key="logo" className={styles.logo}>
          ALEX MOZAGBA
        </NavLink>
        <div
          role="button"
          aria-label="menu"
          className={styles.menuBtn}
          onClick={() => setIsClicked(!isClicked)}
          tabIndex={0}
        >
          <svg
            width="25"
            height="19"
            viewBox="0 0 25 19"
            xmlns="http://www.w3.org/2000/svg"

          >
            <g transform="translate(0, 0)">
              <rect
                className="topBar"
                width="100%"
                height="3"
                x="0"
                y="0"
                fill="#1A56FF"
                stroke="none"
              />
              <rect
                className="midBar"
                width="100%"
                height="3"
                x="0"
                y="8"
                fill="#1A56FF"
                stroke="none"
              />
              <rect
                className="bottomBar"
                width="25px"
                height="3"
                x="0"
                y="16"
                fill="#1A56FF"
                stroke="none"
              />
            </g>
          </svg>
        </div>

        <ul
          key="nav-list"
          aria-label="main navigation"
          className={styles.expandedNav}
        >
          {navLinks.map((link) => (
            <li key={link.name} ref={navLinkRef} className="navListItem">
              <NavLink className={styles.a} to={link.path}>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className={styles.hoverShape}></div>
      </nav>
      <menu ref={langContRef} className={styles.langCont}>
        {languages.map((lang) => (
          <li key={lang.name}>
            <button lang={lang.attrib} aria-label={lang.label}>
              {lang.value}
            </button>
          </li>
        ))}
      </menu>
    </header>
  );
}
