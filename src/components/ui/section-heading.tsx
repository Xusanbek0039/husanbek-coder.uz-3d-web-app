import { cn } from "@/lib/utils";

/** Bosh sahifadagi barcha bo'lim sarlavhalari uchun yagona uslub */
const SectionHeading = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <h2
    id={id}
    className={cn(
      "bg-clip-text text-4xl text-center text-transparent md:text-6xl",
      "bg-gradient-to-b from-black/90 to-black/60",
      "dark:bg-gradient-to-b dark:from-white dark:to-white/50",
      className
    )}
  >
    {children}
  </h2>
);

export default SectionHeading;
