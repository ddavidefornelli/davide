// Prune build log, newest first. Dates and changes come from the prune-website git history.
// Numbers come from prune's production database (Supabase, queried with SQL through
// PostHog's warehouse sync) and Vercel Web Analytics, pulled on Nov 20, 2026.
// The owner's own account is left out of every number.
export const pruneLog = {
  title: "prune build log",
  summary:
    "prune is a daily planner that asks you for three tasks a day, then helps you finish them with focus timers and a weekly review. I built it alone and shipped it in a month, measuring each change against real users.",
  facts: [
    { label: "shipped", value: "Oct 19 – Nov 19, 2026" },
    { label: "commits", value: "146" },
    { label: "users", value: "65 accounts, 1,637 visitors in 30 days" },
    { label: "stack", value: "SolidJS, TypeScript, Supabase, Vercel" },
    { label: "tooling", value: "Playwright, PostHog, Brevo" },
  ],
  highlights: [
    { value: "3.5×", label: "more visitors ending up with a working account after I rebuilt sign-in (2.2% → 7.7%)" },
    { value: "31% → 96%", label: "of started sign-ups that finished signing in" },
    { value: "44% → 55%", label: "of new accounts that added a first task, across three onboarding versions (small sample)" },
  ],
  funnel: {
    title: "funnel since the new sign-in (Nov 8 – 20)",
    steps: [
      { label: "visitors", value: 571 },
      { label: "started sign-up", value: 46 },
      { label: "signed in", value: 44 },
      { label: "added a first task", value: 21 },
      { label: "finished a task", value: 11 },
    ],
  },
  entries: [
    {
      date: "Nov 19",
      title: "Dropped the Mac app and cleaned house",
      points: [
        "Retired the original Mac app so the web version gets all the attention.",
        "Switched analytics to PostHog, synced the production database into it, and moved app logic into classes and constants.",
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
      results: [
        "New accounts adding a first task: 47% → 55% after the \"most important task\" question (6 of 11 accounts, early).",
      ],
    },
    {
      date: "Nov 12",
      title: "Tried to bring people back, and to their first task",
      points: [
        "Daily and weekly reminder emails through Brevo, plus come-back emails timed from each person's last real activity.",
        "Changed the AI review from every Sunday to every 10 completed tasks, with a progress bar on Today.",
        "Onboarding now ends only after you add your first task.",
      ],
      results: [
        "Come-back emails went to 19 inactive accounts. None came back.",
        "Making the first task required barely moved activation: 44% → 47% of new accounts.",
      ],
    },
    {
      date: "Nov 6 – 9",
      title: "Rewrote the landing page and sign-in",
      points: [
        "New headline, \"DO LESS. ACHIEVE MORE.\", with a live product preview under it.",
        "Added a login page with Google or email, replacing the emailed codes of launch week. 38 of the next 46 sign-ups chose Google.",
        "Shows completed tasks struck through, plus a month calendar of finished days.",
      ],
      results: [
        "Visitors ending up with a working account: 2.2% → 7.7% (5 of 227 visitors in the first web week, 44 of 571 after).",
        "Started sign-ups that finished signing in: 31% → 96%.",
      ],
    },
    {
      date: "Nov 2 – 5",
      title: "Tested an onboarding survey, then removed it",
      points: [
        "Built a sign-up survey behind a feature flag, tracking how many people reached each question.",
        "Used the answers to suggest first tasks and default time estimates.",
        "Three days later I removed the survey, guest mode and email codes, and made Google the only way in.",
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
      results: [
        "First web week: 227 visitors, 16 started sign-up with an emailed code, only 5 finished. That became the number to fix.",
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
  openProblem:
    "Retention. Of the 35 people who signed up Nov 8 – 17, 3 have come back on a later day so far, and reminder emails didn't change that. Since Nov 18 every visit is logged, so the next changes can be measured day by day.",
  method:
    "Numbers come from prune's production database (Supabase, queried with SQL) and Vercel Web Analytics, pulled on Nov 20, 2026. My own account is left out. Visitors are mostly from small Google Ads tests, and samples are small, so the onboarding numbers are early signals rather than proof.",
};
