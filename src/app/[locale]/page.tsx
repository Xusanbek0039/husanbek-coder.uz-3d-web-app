import { setRequestLocale } from "next-intl/server";
import HomePage from "@/components/home-page";
import { getContributions, getGithubProfile } from "@/lib/github";
import { getCommittersRank } from "@/lib/committers";
import projects from "@/data/projects";

export const revalidate = 3600;

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const [gh, contributions, committers] = await Promise.all([
    getGithubProfile(),
    getContributions(),
    getCommittersRank(),
  ]);

  return (
    <HomePage
      stats={{
        repos: gh?.public_repos ?? null,
        followers: gh?.followers ?? null,
        contributions,
        committers,
        projects: projects.length,
      }}
    />
  );
}
