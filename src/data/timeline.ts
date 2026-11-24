import { education, experience } from "./experience";
import { pick } from "./types";
import { formatPeriod, type TimelineItem } from "@/components/profile/timeline";

/** Tajriba va ta'limni tanlangan tildagi timeline elementlariga aylantiradi */
export const experienceTimeline = (locale: string, present: string): TimelineItem[] =>
  experience.map((e) => ({
    period: formatPeriod(e.start, e.end, present),
    title: pick(e.role, locale),
    place: pick(e.organization, locale),
    items: e.achievements.map((a) => pick(a, locale)),
  }));

export const educationTimeline = (locale: string, present: string): TimelineItem[] =>
  education.map((d) => ({
    period: formatPeriod(d.start, d.end, present),
    title: pick(d.field, locale),
    place: pick(d.institution, locale),
  }));
