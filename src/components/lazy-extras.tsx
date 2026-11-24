"use client";

import dynamic from "next/dynamic";

/**
 * Bezak uchun komponentlar: sahifa kontenti va LCP'ga ta'sir qilmasligi uchun
 * alohida chunk bo'lib, gidratsiyadan keyin yuklanadi.
 */
export const LazyElasticCursor = dynamic(() => import("./ui/ElasticCursor"), { ssr: false });
export const LazyEasterEggs = dynamic(() => import("./easter-eggs"), { ssr: false });
export const LazyRemoteCursors = dynamic(() => import("./realtime/remote-cursors"), { ssr: false });
