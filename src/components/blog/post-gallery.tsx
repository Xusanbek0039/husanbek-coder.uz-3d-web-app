"use client";

import React from "react";
import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type GalleryLabels = {
  open: string;
  close: string;
  prev: string;
  next: string;
};

/**
 * Post rasmlari: 1 ta — keng muqova; 2–5 ta — itc-academy.uz dagi kabi to'r.
 * Rasm bosilganda shu sahifaning o'zida to'liq ekranli ko'rinish ochiladi (← → va Esc ishlaydi).
 */
const tileClass = (count: number, index: number) => {
  if (count === 1) return "col-span-6 aspect-[16/9]";
  if (count === 3 && index === 0) return "col-span-6 aspect-[16/9]";
  if (count === 5 && index >= 2) return "col-span-2 aspect-[4/3]";
  return "col-span-3 aspect-[4/3]";
};

const tileSizes = (count: number, index: number) => {
  if (count === 1 || (count === 3 && index === 0)) return "(min-width: 768px) 768px, 100vw";
  if (count === 5 && index >= 2) return "(min-width: 768px) 256px, 33vw";
  return "(min-width: 768px) 384px, 50vw";
};

const PostGallery = ({
  images,
  alts,
  labels,
}: {
  images: string[];
  alts: string[];
  labels: GalleryLabels;
}) => {
  const [active, setActive] = React.useState<number | null>(null);
  const count = images.length;
  const go = (step: number) =>
    setActive((i) => (i === null ? i : (i + step + count) % count));

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (count < 2) return;
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  const navButton =
    "absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500";

  return (
    <DialogPrimitive.Root open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
      <div className="mt-8 grid grid-cols-6 gap-2">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`${labels.open}: ${alts[i]}`}
            className={cn(
              "group relative block rounded-md overflow-hidden border-[.5px] border-zinc-700 bg-zinc-900 cursor-zoom-in",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
              tileClass(count, i)
            )}
          >
            <Image
              src={src}
              alt={alts[i]}
              fill
              priority={i === 0}
              sizes={tileSizes(count, i)}
              className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
            />
          </button>
        ))}
      </div>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/90 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          onKeyDown={onKeyDown}
          aria-describedby={undefined}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 focus:outline-none"
        >
          {active !== null && (
            <>
              <DialogPrimitive.Title className="sr-only">{alts[active]}</DialogPrimitive.Title>
              <div className="relative w-full h-full">
                <Image
                  src={images[active]}
                  alt={alts[active]}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
              {count > 1 && (
                <>
                  <button type="button" onClick={() => go(-1)} aria-label={labels.prev} className={cn(navButton, "left-2 md:left-4")}>
                    <ChevronLeft className="w-6 h-6" aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => go(1)} aria-label={labels.next} className={cn(navButton, "right-2 md:right-4")}>
                    <ChevronRight className="w-6 h-6" aria-hidden="true" />
                  </button>
                  <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-md bg-black/60 px-2 py-1 text-xs text-white font-mono">
                    {active + 1} / {count}
                  </span>
                </>
              )}
              <DialogPrimitive.Close
                aria-label={labels.close}
                className="absolute top-3 right-3 flex items-center justify-center w-11 h-11 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </DialogPrimitive.Close>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default PostGallery;
