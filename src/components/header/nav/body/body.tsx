import { motion } from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import styles from "./style.module.scss";
import { blur, translate } from "../../anim";
import { Link as LinkType } from "@/types";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SelectedLink {
  isActive: boolean;
  index: number;
}

interface BodyProps {
  links: LinkType[];
  selectedLink: SelectedLink;
  setSelectedLink: (selectedLink: SelectedLink) => void;
  setIsActive: (isActive: boolean) => void;
}

export default function Body({
  links,
  selectedLink,
  setSelectedLink,
  setIsActive,
}: BodyProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  useEffect(() => {
    if (typeof window === "undefined") return;
    setHash(window.location.hash);
  }, [pathname]);
  const currentHref = pathname + hash;

  const getChars = (word: string) => {
    let chars: JSX.Element[] = [];
    word.split("").forEach((char, i) => {
      chars.push(
        <motion.span
          className="pointer-events-none"
          custom={[i * 0.02, (word.length - i) * 0.01]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          key={char + i}
        >
          {char === " " ? " " : char}
        </motion.span>
      );
    });
    return chars;
  };

  return (
    <div className={cn(styles.body, "flex flex-col items-end md:flex-row")}>
      {links.map((link, index) => {
        const { title, href, target, key } = link;
        const label = key ? t(key) : title;

        return (
          <Link
            key={`l_${index}`}
            href={href}
            target={target}
            className="cursor-can-hover rounded-lg"
          >
            <motion.p
              className={cn(
                "rounded-lg",
                currentHref !== href ? "text-muted-foreground" : "underline"
              )}
              onClick={() => setIsActive(false)}
              onMouseOver={() => setSelectedLink({ isActive: true, index })}
              onMouseLeave={() => setSelectedLink({ isActive: false, index })}
              variants={blur}
              animate={
                selectedLink.isActive && selectedLink.index !== index
                  ? "open"
                  : "closed"
              }
            >
              {getChars(label)}
            </motion.p>
          </Link>
        );
      })}
    </div>
  );
}
