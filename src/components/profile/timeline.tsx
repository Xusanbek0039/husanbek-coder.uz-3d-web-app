export type TimelineItem = {
  period: string;
  title: string;
  place: string;
  items?: string[];
  /** Hozirgi lavozim — "Hozir" belgisi bilan ajratiladi */
  current?: boolean;
  /** Lavozim turi teglari (Pedagogika, Boshqaruv, Dasturlash) */
  tags?: string[];
};

/** Davr matni: 2023 — hozir, 2021 — 2022, yoki bitta yil */
export const formatPeriod = (start: number, end: number | null, present: string) =>
  end === start ? String(start) : `${start} — ${end ?? present}`;

const Timeline = ({ items, currentLabel }: { items: TimelineItem[]; currentLabel?: string }) => (
  <ol className="relative border-l border-zinc-700 ml-2">
    {items.map((item) => (
      <li key={item.period + item.title} className="mb-8 last:mb-0 ml-6">
        <span
          aria-hidden="true"
          className={`absolute -left-[5px] mt-2 w-[9px] h-[9px] rounded-full ${
            item.current ? "bg-emerald-400 ring-4 ring-emerald-400/20" : "bg-zinc-300"
          }`}
        />
        <p className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
          {item.period}
          {item.current && currentLabel && (
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-sans text-emerald-300">
              {currentLabel}
            </span>
          )}
        </p>
        <h3 className="text-lg text-zinc-100">{item.title}</h3>
        <p className="text-sm text-zinc-300">{item.place}</p>
        {item.tags && item.tags.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <li key={tag} className="rounded border border-zinc-600 px-1.5 text-[11px] leading-5 text-zinc-300">
                {tag}
              </li>
            ))}
          </ul>
        )}
        {item.items && item.items.length > 0 && (
          <ul className="mt-2 list-disc pl-4 space-y-1 text-sm text-zinc-400">
            {item.items.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ol>
);

export default Timeline;
