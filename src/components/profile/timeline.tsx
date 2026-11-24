export type TimelineItem = { period: string; title: string; place: string; text?: string };

const Timeline = ({ items }: { items: TimelineItem[] }) => (
  <ol className="relative border-l border-zinc-700 ml-2">
    {items.map((item) => (
      <li key={item.period + item.title} className="mb-8 last:mb-0 ml-6">
        <span className="absolute -left-[5px] mt-2 w-[9px] h-[9px] rounded-full bg-zinc-300" />
        <p className="text-xs font-mono text-zinc-500">{item.period}</p>
        <h3 className="text-lg text-zinc-200">{item.title}</h3>
        <p className="text-sm text-zinc-400">{item.place}</p>
        {item.text && <p className="mt-2 text-sm text-zinc-500">{item.text}</p>}
      </li>
    ))}
  </ol>
);

export default Timeline;
