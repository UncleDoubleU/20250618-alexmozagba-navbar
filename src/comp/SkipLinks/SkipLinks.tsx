import styles from "./SkipLinks.module.sass";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";

export default function SkipLinks() {
  const [isTabbing, setIsTabbing] = useState(false);
  const [skipNavStyle, setSkipNavStyle] = useState(`${styles.skipNav}`);
  let skipLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    isTabbing &&
      setTimeout(() => {
        skipLinkRef.current?.focus();
      }, 100);

    setSkipNavStyle(
      isTabbing ? `${styles.skipNavActive}` : `${styles.skipNav}`
    );
  }, [isTabbing]);

  useEffect(() => {
    window.addEventListener("keyup", handleFirstTab);

    return () => {
      window.removeEventListener("keyup", handleFirstTab);
    };
  }, [isTabbing]);

  function handleFirstTab(e: KeyboardEvent) {
    if (e.key === "Tab") {
      setIsTabbing(true);
    }
  }

  function handleClick(e) {
    document.getElementById("main")?.focus();
    setIsTabbing(false);
  }
  return (
    <Link
      tabIndex={-1}
      ref={skipLinkRef}
      to={{ hash: "#main" }}
      className={skipNavStyle}
      onClick={handleClick}
    >
      skip to content
    </Link>
  );
}
