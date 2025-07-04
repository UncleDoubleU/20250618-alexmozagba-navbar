import styles from "./SkipLinks.module.sass";
import { useEffect, useState, useRef } from "react";

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

  function handleClick() {
    setIsTabbing(false);
    setTimeout(() => {
      const main = document.getElementById("main");
      if (main) {
        main.tabIndex = -1;
        main.focus();
      }
    });
  }
  return (
    <a
      ref={skipLinkRef}
      href="#main"
      className={skipNavStyle}
      onClick={handleClick}
      onFocus={() => setIsTabbing(true)}
      onBlur={() => setIsTabbing(false)}
    >
      skip to content
    </a>
  );
}
