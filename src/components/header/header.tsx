"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./language-switcher";
import styles from "./style.module.scss";
import { opacity, background } from "./anim";
import Nav from "./nav";
import { cn } from "@/lib/utils";
import FunnyThemeToggle from "../theme/funny-theme-toggle";
import { Button } from "../ui/button";
import { config } from "@/data/config";
import OnlineUsers from "../realtime/online-users";

interface HeaderProps {
  loader?: boolean;
}

const Header = ({ loader }: HeaderProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const t = useTranslations("nav");
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback((returnFocus = false) => {
    setIsActive(false);
    if (returnFocus) menuButtonRef.current?.focus();
  }, []);

  // Menyu ochiq bo'lsa: Esc bosilganda yoki header'dan tashqariga bosilganda yopiladi
  useEffect(() => {
    if (!isActive) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu(true);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isActive, closeMenu]);

  return (
    <motion.header
      ref={headerRef}
      className={cn(
        styles.header,
        "transition-colors delay-100 duration-500 ease-in"
      )}
      style={{
        background: isActive ? "hsl(var(--background) / .8)" : "transparent",
        // backgroundImage:
        //   "linear-gradient(0deg, rgba(0, 0, 0, 0), rgb(0, 0, 0))",
      }}
      initial={{
        y: -80,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        delay: loader ? 3.5 : 0, // 3.5 for loading, .5 can be added for delay
        duration: 0.8,
      }}
    >
      {/* <div
        className="absolute inset-0 "
        style={{
          mask: "linear-gradient(rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 12.5%)",
        }}
      >
      </div> */}
      <div className={cn(styles.bar, "flex items-center justify-between")}>
        <Button asChild variant={"link"} className="text-md">
          <Link href="/" aria-label={t("homeLabel", { name: config.author })}>
            {config.author}
          </Link>
        </Button>

        {/* Realtime server (NEXT_PUBLIC_WS_URL) deploy qilinmagan bo'lsa hisoblagich doim 0 ko'rsatadi — yashiramiz */}
        {process.env.NEXT_PUBLIC_WS_URL && <OnlineUsers />}
        <LanguageSwitcher />
        <FunnyThemeToggle className="w-6 h-6 mr-4" />
        <Button
          ref={menuButtonRef}
          variant={"ghost"}
          onClick={() => setIsActive(!isActive)}
          aria-expanded={isActive}
          aria-label={isActive ? t("close") : t("menu")}
          className={cn(
            styles.el,
            "m-0 p-0 h-6 bg-transparent flex items-center justify-center"
          )}
        >
          <div className="relative flex items-center">
            <motion.p
              variants={opacity}
              animate={!isActive ? "open" : "closed"}
            >
              {t("menu")}
            </motion.p>
            <motion.p variants={opacity} animate={isActive ? "open" : "closed"}>
              {t("close")}
            </motion.p>
          </div>
          <div
            className={`${styles.burger} ${
              isActive ? styles.burgerActive : ""
            }`}
          ></div>
        </Button>
      </div>
      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? "open" : "closed"}
        className={styles.background}
        // Sahifaning bo'sh joyiga (qorong'i qatlamga) bosish menyuni yopadi
        onClick={() => closeMenu()}
        aria-hidden="true"
      ></motion.div>
      <AnimatePresence mode="wait">
        {isActive && <Nav setIsActive={setIsActive} />}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
