export const siteData = {
  identity: {
    name: "Davide Fornelli",
    displayName: "davide fornelli",
    location: "bari, italy",
    email: "fornelli.dv@gmail.com",
    github: "https://github.com/ddavidefornelli",
    cv: "./FornelliCV.pdf",
    role: "full-stack developer at deloitte",
    study: "computer science student at uniba",
  },
  intro: {
    subtitle: "full-stack developer at deloitte - bari, italy",
    summary: [
      "i'm a computer science student at uniba and i currently work as a full-stack developer at deloitte.",
      "i like building small products, terminal tools, visual experiments and interfaces that feel clean and fast.",
      "right now i'm looking for software engineer opportunities at startups.",
    ],
  },
  blog: {
    title: "blog",
    actionLabel: "all posts ->",
    actionHref: "#blog",
    items: [
      {
        date: "soon",
        title: "writing in progress",
        href: "",
      },
      {
        date: "soon",
        title: "notes, build logs and project breakdowns will land here",
        href: "",
      },
    ],
  },
  work: {
    title: "work",
    actionLabel: "all work ->",
    actionHref: "#work",
    items: [
      {
        title: "deloitte",
        meta: "full-stack developer - present",
        description:
          "working on full-stack product delivery while sharpening engineering fundamentals in production environments.",
        href: "",
      },
      {
        title: "uniba",
        meta: "computer science student - ongoing",
        description:
          "studying computer science while continuing to ship side projects, experiments and personal tools.",
        href: "",
      },
      {
        title: "open to startups",
        meta: "software engineer opportunities - active",
        description:
          "looking for teams where speed, ownership and product taste matter.",
        href: "mailto:fornelli.dv@gmail.com",
      },
    ],
  },
  projectsSection: {
    title: "projects",
    actionLabel: "all projects ->",
    actionHref: "#projects",
  },
  projects: [
    {
      title: "sudoku",
      description: "the classic sudoku game played in the terminal, made in c.",
      href: "https://github.com/ddavidefornelli/sudoku",
      kind: "c / terminal",
      meta: "personal project",
      external: true,
    },
    {
      title: "no screenshot",
      description: "a word you can read but can't screenshot.",
      href: "",
      kind: "experiment",
      meta: "concept / wip",
      external: false,
    },
    {
      title: "mega tris",
      description:
        "my first project in react, and also the first one where i used git. the code is rough but i'm still proud of it.",
      href: "https://github.com/ddavidefornelli/megatris",
      kind: "react",
      meta: "game project",
      external: true,
    },
    {
      title: "boid flock",
      description: "a small flocking simulation that mostly exists because it looks cool.",
      href: "https://github.com/ddavidefornelli/bird-flock",
      kind: "creative coding",
      meta: "visual experiment",
      external: true,
    },
    {
      title: "dot files",
      description: "all of my linux, shell and neovim minimal configurations. i use arch btw.",
      href: "https://github.com/ddavidefornelli/dotfiles",
      kind: "linux",
      meta: "configs",
      external: true,
    },
  ],
  links: [
    {
      label: "email",
      href: "mailto:fornelli.dv@gmail.com",
      description: "fornelli.dv@gmail.com",
      external: false,
    },
    {
      label: "github",
      href: "https://github.com/ddavidefornelli",
      description: "github.com/ddavidefornelli",
      external: true,
    },
    {
      label: "cv",
      href: "./FornelliCV.pdf",
      description: "open resume pdf",
      external: true,
    },
  ],
  siteStack: "built with react, tailwindcss, vite and bun.",
};
