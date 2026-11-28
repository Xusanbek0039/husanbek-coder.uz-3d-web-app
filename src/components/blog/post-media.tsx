import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Post rasmlari (1–5 ta) va videosi. Joylashuv itc-academy.uz dagidek:
 * 3 ta rasm — birinchisi keng; 5 ta — 2 ta katta + 3 ta kichik; qolganlari — 2 ustun.
 */
const tileClass = (count: number, index: number) => {
  if (count === 3 && index === 0) return "col-span-6 aspect-[16/9]";
  if (count === 5 && index >= 2) return "col-span-2 aspect-[4/3]";
  return "col-span-3 aspect-[4/3]";
};

const PostMedia = ({
  title,
  images,
  video,
  imageAlt,
}: {
  title: string;
  images: string[];
  video: string | null;
  imageAlt: (index: number) => string;
}) => {
  const [cover] = images;
  return (
    <>
      {images.length === 1 && (
        <div className="relative mt-8 aspect-[16/9] rounded-md overflow-hidden border-[.5px] border-zinc-700 bg-zinc-900">
          <Image
            src={cover}
            alt={title}
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      {images.length > 1 && (
        <div className="mt-8 grid grid-cols-6 gap-2">
          {images.map((src, i) => (
            <a
              key={src}
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative block rounded-md overflow-hidden border-[.5px] border-zinc-700 bg-zinc-900",
                tileClass(images.length, i)
              )}
            >
              <Image
                src={src}
                alt={imageAlt(i + 1)}
                fill
                priority={i === 0}
                sizes={images.length === 5 && i >= 2 ? "(min-width: 768px) 256px, 33vw" : "(min-width: 768px) 384px, 50vw"}
                className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
              />
            </a>
          ))}
        </div>
      )}

      {video && (
        <video
          src={video}
          controls
          preload="metadata"
          playsInline
          poster={cover}
          className="mt-6 block w-full max-h-[70vh] rounded-md border-[.5px] border-zinc-700 bg-black"
        />
      )}
    </>
  );
};

export default PostMedia;
