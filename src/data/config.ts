const config = {
  title: "Husan Suyunov",
  description: {
    long: "Husan Suyunov — Full-Stack Python dasturchi, IT Park Zomin filiali rahbari. Django, DRF, FastAPI va React'da LMS, CRM tizimlari va Telegram botlar yarataman.",
    short:
      "Full-Stack Python dasturchi: Django, DRF, FastAPI, React — LMS/CRM tizimlari va Telegram botlar.",
  },
  author: "Husan Suyunov",
  email: "itpark0071@gmail.com",
  site: "https://husanbek-coder.uz",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "https://x.com/xusanbek0039/",
    linkedin: "https://www.linkedin.com/in/xusanbek0039/",
    instagram: "https://www.instagram.com/husanbek_coder/",
    facebook: "https://www.facebook.com/",
    github: "https://github.com/xusanbek0039/",
    gitlab: "https://gitlab.com/Xusanbek0071",
    youtube: "https://www.youtube.com/@IT_Creative",
    telegram: "https://t.me/husanbek_coder",
    telegramChannel: "https://t.me/IT_Creative",
  },
};
export { config };
