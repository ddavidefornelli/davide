// Prune build log, newest first. Dates and changes come from the prune-website git history.
export const pruneLog = {
  title: "prune build log",
  summary:
    "prune is a daily planner that asks you for three tasks a day, then helps you finish them with focus timers and a weekly review. I built it alone and shipped it in a month.",
  facts: [
    { label: "shipped", value: "Oct 19 – Nov 19, 2026" },
    { label: "commits", value: "146" },
    { label: "stack", value: "SolidJS, TypeScript, Supabase, Vercel" },
    { label: "tooling", value: "Playwright, PostHog, Brevo" },
  ],
  entries: [
    {
      date: "Nov 19",
      title: "Dropped the Mac app and cleaned house",
      points: [
        "Retired the original Mac app so the web version gets all the attention.",
        "Switched analytics to PostHog and moved app logic into classes and constants.",
        "Fixed the estimate dial so it rolls back when a save fails.",
      ],
    },
    {
      date: "Nov 16 – 18",
      title: "Built habits: streaks, check-ins, focus time",
      points: [
        "Added daily streaks, with a small celebration when today's streak lights up.",
        "Added a weekly check-in: the first one three days after sign-up, then weekly.",
        "Onboarding now asks when you like to focus and sends reminders at that time.",
        "Replaced ready-made task suggestions with one question: what's the most important thing today?",
        "Added rain and white noise to the focus screen, plus one-tap reasons when you stop the timer.",
      ],
    },
    {
      date: "Nov 12",
      title: "Gave people a reason to come back",
      points: [
        "Daily and weekly reminder emails through Brevo, timed from each person's last real activity.",
        "Changed the AI review from every Sunday to every 10 completed tasks, with a progress bar on Today.",
        "Onboarding now ends only after you add your first task.",
      ],
    },
    {
      date: "Nov 6 – 9",
      title: "Rewrote the landing page",
      points: [
        "New headline, \"DO LESS. ACHIEVE MORE.\", with a live product preview under it.",
        "Added a login page with email or Google.",
        "Shows completed tasks struck through, plus a month calendar of finished days.",
      ],
    },
    {
      date: "Nov 2 – 5",
      title: "Tested an onboarding survey, then removed it",
      points: [
        "Built a sign-up survey behind a feature flag, tracking how many people reached each question.",
        "Used the answers to suggest first tasks and default time estimates.",
        "Three days later I removed the survey and guest mode to keep sign-up simple.",
      ],
    },
    {
      date: "Oct 27 – 31",
      title: "Worked on getting people to their first task",
      points: [
        "Added onboarding and a guided tour to get more people to create a task.",
        "Redesigned the guest sign-in prompt and fixed a Safari rendering bug.",
        "Added session replays and anonymous daily usage counts to see where people got stuck.",
      ],
    },
    {
      date: "Oct 23 – 25",
      title: "Moved from desktop to the web",
      points: [
        "Rebuilt prune as a web app, so trying it doesn't need a download.",
        "Hardened security before going to production.",
        "Added account deletion.",
      ],
    },
    {
      date: "Oct 19 – 20",
      title: "Shipped v1 as a Mac app",
      points: [
        "First release as a downloadable Mac app, two days after the first commit.",
        "Added analytics and a download page for ads on day one.",
      ],
    },
  ],
};
