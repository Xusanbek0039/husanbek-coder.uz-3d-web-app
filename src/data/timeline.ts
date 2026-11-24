import { education, sortedExperience, type ExperienceItem } from "./experience";
import { pick } from "./types";
import { formatPeriod, type TimelineItem } from "@/components/profile/timeline";

export type ExperienceLabels = {
  present: string;
  kinds: Record<ExperienceItem["kind"][number], string>;
};

/** Tajribani tanlangan tildagi timeline elementlariga aylantiradi (hozirgi lavozimlar birinchi) */
export const experienceTimeline = (locale: string, labels: ExperienceLabels): TimelineItem[] =>
  sortedExperience().map((e) => ({
    period: formatPeriod(e.start, e.end, labels.present),
    title: pick(e.role, locale),
    place: pick(e.organization, locale),
    items: e.achievements.map((a) => pick(a, locale)),
    current: e.end === null,
    tags: e.kind.map((k) => labels.kinds[k]),
  }));

export const educationTimeline = (locale: string, present: string): TimelineItem[] =>
  education.map((d) => ({
    period: formatPeriod(d.start, d.end, present),
    title: pick(d.field, locale),
    place: pick(d.institution, locale),
  }));
