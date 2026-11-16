import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Til prefiksini avtomatik qo'shadigan Link / router
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
