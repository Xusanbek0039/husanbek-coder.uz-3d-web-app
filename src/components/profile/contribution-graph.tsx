import type { Contributions } from "@/lib/github";

export const LEVEL_CLASS = [
  "bg-zinc-800",
  "bg-emerald-900",
  "bg-emerald-700",
  "bg-emerald-500",
  "bg-emerald-300",
];

const ContributionGraph = ({
  data,
  dayLabel,
  totalLabel,
  less,
  more,
}: {
  data: Contributions;
  dayLabel: (date: string, count: number) => string;
  totalLabel: string;
  less: string;
  more: string;
}) => (
  <div>
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-[3px] w-max">
        {data.weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((d) => (
              <span
                key={d.date}
                title={dayLabel(d.date, d.count)}
                className={`block w-[10px] h-[10px] rounded-[2px] ${LEVEL_CLASS[d.level]}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
    <div className="mt-3 flex flex-wrap gap-2 items-center justify-between text-xs text-zinc-600 dark:text-zinc-300">
      <span>{totalLabel}</span>
      <span className="flex items-center gap-1">
        {less}
        {LEVEL_CLASS.map((c) => (
          <span key={c} className={`block w-[10px] h-[10px] rounded-[2px] ${c}`} />
        ))}
        {more}
      </span>
    </div>
  </div>
);

export default ContributionGraph;
