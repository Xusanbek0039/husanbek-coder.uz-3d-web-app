"use client";
import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Video = { id: string; title: string; thumbnail: string; date: string | null };

export default function VideoGrid({ videos }: { videos: Video[] }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((v) => (
        <li key={v.id}>
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="group w-full text-left border-[.5px] rounded-md border-zinc-600 overflow-hidden hover:border-zinc-400 transition-colors"
                style={{ backdropFilter: "blur(2px)" }}
              >
                <div className="relative aspect-video bg-zinc-900 overflow-hidden">
                  <Image
                    src={v.thumbnail}
                    alt={v.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                    <span className="flex items-center justify-center w-14 h-14 rounded-full bg-red-600 text-white shadow-lg">
                      <Play className="w-6 h-6 ml-1" fill="currentColor" />
                    </span>
                  </span>
                </div>
                <div className="p-4">
                  <h2 className="text-base leading-snug line-clamp-2 text-zinc-200">{v.title}</h2>
                  {v.date && <p className="mt-2 text-xs text-zinc-500">{v.date}</p>}
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-[95vw] p-0 overflow-hidden bg-black border-zinc-700">
              <DialogTitle className="sr-only">{v.title}</DialogTitle>
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </DialogContent>
          </Dialog>
        </li>
      ))}
    </ul>
  );
}
