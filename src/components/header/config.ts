import { Link } from "@/types";

const links: (Link & { icon: string })[] = [
  {
    title: 'Bosh sahifa',
    key: 'home',
    href: '/',
    thumbnail: '/assets/nav-link-previews/landing.webp',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7m-9 2v6m0 0h4m-4 0H7m4-6v6" /></svg>`
  },
  {
    title: 'Men haqimda',
    key: 'about',
    href: '/about',
    thumbnail: '/assets/nav-link-previews/about.webp',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.657 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`
  },
  {
    title: 'Rezyume',
    key: 'resume',
    href: '/resume',
    thumbnail: '/assets/nav-link-previews/about.webp',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>`
  },
  {
    title: "Ko'nikmalar",
    key: 'skills',
    href: '/#skills-cv',
    thumbnail: '/assets/nav-link-previews/skills.webp',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 3a1 1 0 00-1 1v4.25H5.25a1 1 0 000 2H8.75v4.25a1 1 0 001 1h4.25v3.5a1 1 0 102 0v-3.5h4.25a1 1 0 100-2h-4.25v-4.25a1 1 0 00-1-1H9.75V4a1 1 0 00-1-1z" /></svg>`
  },
  {
    title: 'Loyihalar',
    key: 'projects',
    href: '/projects',
    thumbnail: '/assets/nav-link-previews/projects.webp',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18M3 17h18" /></svg>`
  },
  {
    title: 'Xizmatlar',
    key: 'services',
    href: '/services',
    thumbnail: '/assets/nav-link-previews/services.webp',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`
  },
  {
    title: 'Bloglar',
    key: 'blog',
    href: '/blog',
    thumbnail: '/assets/nav-link-previews/blog.webp',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h5l2 2h7a2 2 0 012 2v10a2 2 0 01-2 2z" /></svg>`
  },
  {
    title: "Bog'lanish",
    key: 'contact',
    href: '/#contact',
    thumbnail: '/assets/nav-link-previews/contact.webp',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>`
  }
];

export { links };
