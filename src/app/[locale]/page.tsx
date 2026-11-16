import { setRequestLocale } from "next-intl/server";
import HomePage from "@/components/home-page";

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <HomePage />;
}
