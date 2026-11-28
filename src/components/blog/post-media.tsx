import PostGallery, { type GalleryLabels } from "./post-gallery";

/**
 * Post rasmlari (1–5 ta) va videosi. Rasmlar shu sayt ichida kattalashtiriladi
 * (itc-academy.uz dagi faylga o'tib ketmaydi).
 */
const PostMedia = ({
  images,
  video,
  alts,
  labels,
}: {
  images: string[];
  video: string | null;
  alts: string[];
  labels: GalleryLabels;
}) => (
  <>
    {images.length > 0 && <PostGallery images={images} alts={alts} labels={labels} />}

    {video && (
      <video
        src={video}
        controls
        preload="metadata"
        playsInline
        poster={images[0]}
        className="mt-6 block w-full max-h-[70vh] rounded-md border-[.5px] border-zinc-700 bg-black"
      />
    )}
  </>
);

export default PostMedia;
