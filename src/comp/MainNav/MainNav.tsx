import { NavLink } from "react-router";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./MainNav.module.sass";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

export default function MainNav() {
  const [navListClass, setNavListClass] = useState(`${styles.ul}`);
  const [langClass, setLangClass] = useState(`${styles.langCont}`);
  const [isClicked, setIsClicked] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const menuBtnRef = useRef<HTMLDivElement>(null);
  const menuVectorRef = useRef<SVGSVGElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const hShapeRef = useRef<HTMLDivElement>(null);
  const navLinkRef = useRef<HTMLLIElement>(null);
  const tl = useRef<GSAPTimeline | null>(null)
  // const mS = window.matchMedia("(width <= 1024)")



  // const { contextSafe } = useGSAP({ scope: headerRef });

  useEffect(() => {
    menuAnim();
    // if (menuBtnRef?.current && width <= 1024) {

    //   menuBtnRef.current.addEventListener("click", () => openBurger)
    // }
    return () => {

    };
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
    console.log(isClicked, width);
  }

  function menuBtnClick() {
    setIsClicked((c) => !c);
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

  function menuAnim() {
    if (menuBtnRef.current && isClicked) {
      setNavListClass(`${styles.expandedNav}`)
      // openBurger()
    }
    if (menuBtnRef.current && !isClicked) {
      setNavListClass(`${styles.ul}`)
      // closeBurger()
    }
    // setNavListClass(isClicked ? `${styles.expandedNav}` : `${styles.ul}`);
    setLangClass(
      !isClicked && width <= 1024 ? styles.inactive : styles.langCont
    );
  }

  useGSAP(() => {
    tl.current = gsap.timeline({
      defaults: {
        duration: 0.3,
        ease: "power4.out"
      }
    })
      .from('.topBar', { rotation: 0, y: 0, transformOrigin: "center center", delay: 0.1 }, 0)
      .from('.midBar', { opacity: 1, delay: 0.1 }, 0)
      .from('.bottomBar', { rotation: 0, y: 0, transformOrigin: "center center", delay: 0.1 }, 0)
      .from(headerRef.current, { height: "2.75rem" }, -0.2)

      .to('.topBar', { rotation: 45, y: 8, transformOrigin: "center center" }, 0.6)
      .to('.midBar', { opacity: 0 }, 0.6)
      .to('.bottomBar', { rotation: -45, y: -8, transformOrigin: "center center" }, 0.6)
      .to(headerRef.current, { height: "auto", duration: 0.5 })
      .reverse();

  }, { scope: headerRef, revertOnUpdate: true })

  useEffect(() => {
    tl.current?.reversed(!isClicked)
  }, [isClicked])



  // const openBurger = contextSafe(() => {
  //   tl = gsap.timeline();
  //   tl.clear()
  //   tl.to('.topBar', {
  //     rotation: 45,
  //     duration: .2,
  //     transformOrigin: "center center",
  //     y: 8,
  //     ease: "power4.inOut"
  //   })
  //     .to('.midBar',
  //       {
  //         opacity: 0,
  //         duration: .2
  //       }, 0)
  //     .to('.bottomBar', {
  //       rotation: -45,
  //       duration: .2,
  //       transformOrigin: "center center",
  //       y: -8, ease: "power4.inOut"
  //     }, 0)
  //     .to(headerRef.current, {
  //       height: "auto",
  //       duration: .2,
  //       ease: "power4.out"
  //     }, 0);
  // });

  // const closeBurger = contextSafe(() => {
  //   tl = gsap.timeline();
  //   tl.clear()
  //   tl.to('.topBar', {
  //     rotation: 0,
  //     duration: .1,
  //     transformOrigin: "center center",
  //     y: 0,
  //     ease: "power4.inOut"
  //   })
  //     .to('.midBar', {
  //       opacity: 1,
  //       duration: .1
  //     }, 0)
  //     .to('.bottomBar', {
  //       rotation: 0,
  //       duration: .1,
  //       transformOrigin: "center center",
  //       y: 0,
  //       ease: "power4.inOut"
  //     }, 0)
  //     .to(headerRef.current, {
  //       duration: .2,
  //       height: "2.75rem",
  //       ease: "power4.out"
  //     }, 0)
  // });



  // useEffect(() => {
  //   if (menuBtnRef.current) {
  //     menuBtnRef.current.addEventListener("click", () => !isClicked ? openBurger : console.log("closeBurger"))
  //   }
  //   return () => {
  //     if (menuBtnRef.current) {
  //       menuBtnRef.current.removeEventListener("click", () => !isClicked ? openBurger : console.log("closeBurger"))
  //     }
  //   }
  // }, [isClicked])

  // const openBurger = contextSafe(() => {
  //   tl = gsap.timeline();
  //   tl.to('.topBar', { rotate: 45, duration: .2 })
  //     .to('.midBar', { opacity: 0, duration: .2 }, 0)
  //     .to('.bottomBar', { rotate: -45, duration: .2 }, 0)

  // });

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
          onClick={() => setIsClicked(!isClicked)}
          tabIndex={0}
        >
          <svg
            width="25"
            height="19"
            viewBox="0 0 25 19"
            xmlns="http://www.w3.org/2000/svg"
            ref={menuVectorRef}
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
          className={navListClass}
        >
          {navLinks.map((link) => (
            <li key={link.name} ref={navLinkRef} className="navListItem">
              <NavLink className={styles.a} to={link.path}>
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
    </header>
  );
}
