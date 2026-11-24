"use client";
import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
  useRef,
} from "react";
import { AnimatePresence } from "framer-motion";

import Loader from "./loader";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

// Preloader faqat 3D sahna yuklanadigan joyda kerak: bosh sahifa (/, /ru, /en)
const isHomePath = (path: string | null) =>
  path === "/" || routing.locales.some((l) => path === `/${l}`);

type PreloaderContextType = {
  isLoading: boolean;
  loadingPercent: number;
  bypassLoading: () => void;
};
const INITIAL: PreloaderContextType = {
  isLoading: true,
  loadingPercent: 0,
  bypassLoading: () => {},
};
export const preloaderContext = createContext<PreloaderContextType>(INITIAL);

type PreloaderProps = {
  children: ReactNode;
  disabled?: boolean;
};

export const usePreloader = () => {
  const context = useContext(preloaderContext);
  if (!context) {
    throw new Error("usePreloader must be used within a PreloaderProvider");
  }
  return context;
};
const LOADING_TIME = 2.5;
function Preloader({ children, disabled = false }: PreloaderProps) {
  const pathname = usePathname();
  // Ichki sahifalarda (about, resume, ...) preloader umuman ko'rsatilmaydi — kontent darhol chiqadi
  const [isLoading, setIsLoading] = useState(() => !disabled && isHomePath(pathname));
  const [loadingPercent, setLoadingPercent] = useState(0);
  const loadingTween = useRef<gsap.core.Tween>();

  const bypassLoading = () => {
    loadingTween.current?.progress(0.99).kill();
    setLoadingPercent(100);
    setIsLoading(false);
    // console.log("killed", loadingTween.current);
  };
  const loadingPercentRef = useRef<{ value: number }>({ value: 0 });
  useEffect(() => {
    if (!isLoading) {
      setLoadingPercent(100);
      return;
    }
    // Telefonda yoki "harakatni kamaytirish" rejimida 3D yuklanmaydi — kutishga hojat yo'q
    if (window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)").matches) {
      setLoadingPercent(100);
      setIsLoading(false);
      return;
    }
    loadingTween.current = gsap.to(loadingPercentRef.current, {
      value: 100,
      duration: LOADING_TIME,
      ease: "slow(0.7,0.7,false)",
      onUpdate: () => {
        setLoadingPercent(loadingPercentRef.current.value);
      },
      onComplete: () => {
        setIsLoading(false);
        // observe: this change has not been observed for errors.
        // window.scrollTo(0, 0);
      },
    });
  }, []);

  return (
    <preloaderContext.Provider
      value={{ isLoading, bypassLoading, loadingPercent }}
    >
      <AnimatePresence mode="wait">{isLoading && <Loader />}</AnimatePresence>
      {children}
    </preloaderContext.Provider>
  );
}

export default Preloader;
