import "server-only";

export const GITHUB_USER = "Xusanbek0039";
const REVALIDATE = 3600;

const headers = (): HeadersInit => ({
  Accept: "application/vnd.github+json",
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
});

export type GithubProfile = {
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  bio: string | null;
};

export type GithubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

export type LanguageShare = { name: string; count: number; percent: number; color: string };

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
export type Contributions = { total: number; weeks: ContributionDay[][] };

// GitHub linguist ranglari (eng ko'p uchraydiganlari)
const LANG_COLORS: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Go: "#00ADD8",
  PHP: "#4F5D95",
  Shell: "#89e051",
  Dart: "#00B4AB",
  Vue: "#41b883",
  "Jupyter Notebook": "#DA5B0B",
  Kotlin: "#A97BFF",
};

export async function getGithubProfile(): Promise<GithubProfile | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}`, {
      headers: headers(),
      next: { revalidate: REVALIDATE },
    });
    return res.ok ? ((await res.json()) as GithubProfile) : null;
  } catch {
    return null;
  }
}

export async function getGithubRepos(): Promise<GithubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=100&type=owner`,
      { headers: headers(), next: { revalidate: REVALIDATE } }
    );
    if (!res.ok) return [];
    const repos = (await res.json()) as GithubRepo[];
    return repos.filter((r) => !r.fork && !r.archived);
  } catch {
    return [];
  }
}

export function languageShares(repos: GithubRepo[], top = 6): LanguageShare[] {
  const counts = new Map<string, number>();
  repos.forEach((r) => {
    if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
  });
  const total = Array.from(counts.values()).reduce((a, b) => a + b, 0);
  if (!total) return [];
  const sorted = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  const head = sorted.slice(0, top);
  const restCount = sorted.slice(top).reduce((a, [, c]) => a + c, 0);
  const list = restCount ? [...head, ["Boshqa", restCount] as [string, number]] : head;
  return list.map(([name, count]) => ({
    name,
    count,
    percent: Math.round((count / total) * 1000) / 10,
    color: LANG_COLORS[name] ?? "#71717a",
  }));
}

const LEVELS: Record<string, ContributionDay["level"]> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

/** Yillik contribution kalendari — faqat GITHUB_TOKEN bo'lsa (GraphQL token talab qiladi) */
export async function getContributions(): Promise<Contributions | null> {
  if (!process.env.GITHUB_TOKEN) return null;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { ...headers(), "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query($login: String!) {
          user(login: $login) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks { contributionDays { date contributionCount contributionLevel } }
              }
            }
          }
        }`,
        variables: { login: GITHUB_USER },
      }),
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const cal = data?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!cal) return null;
    return {
      total: cal.totalContributions,
      weeks: cal.weeks.map((w: any) =>
        w.contributionDays.map((d: any) => ({
          date: d.date,
          count: d.contributionCount,
          level: LEVELS[d.contributionLevel] ?? 0,
        }))
      ),
    };
  } catch {
    return null;
  }
}
