export type TimelineItem = { period: string; title: string; place: string; items?: string[] };

/** Davr matni: 2023 — hozir, 2021 — 2022, yoki bitta yil */
export const formatPeriod = (start: number, end: number | null, present: string) =>
  end === start ? String(start) : `${start} — ${end ?? present}`;

const Timeline = ({ items }: { items: TimelineItem[] }) => (
  <ol className="relative border-l border-zinc-700 ml-2">
    {items.map((item) => (
      <li key={item.period + item.title} className="mb-8 last:mb-0 ml-6">
        <span aria-hidden="true" className="absolute -left-[5px] mt-2 w-[9px] h-[9px] rounded-full bg-zinc-300" />
        <p className="text-xs font-mono text-zinc-400">{item.period}</p>
        <h3 className="text-lg text-zinc-100">{item.title}</h3>
        <p className="text-sm text-zinc-300">{item.place}</p>
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
