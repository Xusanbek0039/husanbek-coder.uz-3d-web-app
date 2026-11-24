import { setRequestLocale } from "next-intl/server";
import HomePage from "@/components/home-page";
import { getContributions, getGithubProfile } from "@/lib/github";
import { getCommittersRank } from "@/lib/committers";
import projects from "@/data/projects";
import { experienceYears, studentsCount } from "@/data/profile";
import { hasCvPdf } from "@/lib/cv";

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
        years: experienceYears(),
        students: studentsCount,
      }}
      cvAvailable={hasCvPdf()}
    />
  );
}
