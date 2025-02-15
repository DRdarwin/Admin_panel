export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Administrator's Panel",
  description:
    "Flight Management Administrator Dashboard",
  mainNav: [
    {
      title: "Dashboard",
      href: "/",
    },
    {
      title: "Mail",
      href: "/mail",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
