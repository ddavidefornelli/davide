import { siteData } from "./data/site-data.js";

const navigation = [
  { href: "#home", label: "[h] home" },
  { href: "#blog", label: "[b] blog" },
  { href: "#work", label: "[w] work" },
  { href: "#projects", label: "[p] projects" },
  { href: "#elsewhere", label: "[e] elsewhere" },
];

function NavLink({ href, label }) {
  return (
    <a href={href} className="text-sm text-muted transition hover:text-text focus-visible:text-text">
      {label}
    </a>
  );
}

function SectionHeader({ title, actionHref, actionLabel }) {
  return (
    <div className="mb-8 flex items-center justify-between gap-4">
      <h2 className="flex items-center gap-2 text-[2rem] font-semibold tracking-[-0.03em] text-text sm:text-[2.2rem]">
        <span className="text-accent">*</span>
        <span>{title}</span>
      </h2>
      <a href={actionHref} className="shrink-0 text-sm text-accent transition hover:text-accent-soft">
        {actionLabel}
      </a>
    </div>
  );
}

function Section({ id, title, actionHref, actionLabel, children }) {
  return (
    <section id={id} className="border-t border-white/10 py-10 sm:py-12">
      <SectionHeader title={title} actionHref={actionHref} actionLabel={actionLabel} />
      {children}
    </section>
  );
}

function BlogItem({ item }) {
  const Tag = item.href ? "a" : "article";
  const interactiveProps = item.href
    ? {
        href: item.href,
        target: "_blank",
        rel: "noreferrer",
      }
    : {};

  return (
    <Tag
      {...interactiveProps}
      className={`grid gap-2 py-3 sm:grid-cols-[7.5rem_minmax(0,1fr)] ${
        item.href ? "transition hover:text-accent focus-visible:text-accent" : ""
      }`}
    >
      <p className="text-sm text-muted">{item.date}</p>
      <h3 className="text-[1.55rem] leading-tight tracking-[-0.02em] text-text sm:text-[1.85rem]">
        {item.title}
      </h3>
    </Tag>
  );
}

function WorkItem({ item }) {
  const Tag = item.href ? "a" : "article";
  const interactiveProps = item.href
    ? {
        href: item.href,
        target: item.href.startsWith("mailto:") ? undefined : "_blank",
        rel: item.href.startsWith("mailto:") ? undefined : "noreferrer",
      }
    : {};

  return (
    <Tag
      {...interactiveProps}
      className={`group grid gap-4 py-7 sm:grid-cols-[minmax(0,1fr)_2rem] ${
        item.href ? "transition hover:text-accent focus-visible:text-accent" : ""
      }`}
    >
      <div className="space-y-2">
        <h3 className="text-[2rem] font-semibold leading-none tracking-[-0.04em] text-text sm:text-[2.35rem]">
          {item.title}
        </h3>
        <p className="text-sm text-muted">{item.meta}</p>
        <p className="max-w-3xl text-[1.2rem] leading-relaxed text-text sm:text-[1.45rem]">
          {item.description}
        </p>
      </div>
      <span className="pt-1 text-right text-lg text-muted transition group-hover:text-accent">
        {item.href ? "->" : ""}
      </span>
    </Tag>
  );
}

function ProjectItem({ project }) {
  const Tag = project.href ? "a" : "article";
  const interactiveProps = project.href
    ? {
        href: project.href,
        target: project.external ? "_blank" : undefined,
        rel: project.external ? "noreferrer" : undefined,
      }
    : {};

  return (
    <Tag
      {...interactiveProps}
      className={`group grid gap-4 py-7 sm:grid-cols-[minmax(0,1fr)_2rem] ${
        project.href ? "transition hover:text-accent focus-visible:text-accent" : ""
      }`}
    >
      <div className="space-y-2">
        <h3 className="text-[1.9rem] font-semibold leading-none tracking-[-0.04em] text-text sm:text-[2.1rem]">
          {project.title}
        </h3>
        <p className="text-sm text-muted">
          {project.kind} - {project.meta}
        </p>
        <p className="max-w-3xl text-[1.15rem] leading-relaxed text-text sm:text-[1.35rem]">
          {project.description}
        </p>
      </div>
      <span className="pt-1 text-right text-lg text-muted transition group-hover:text-accent">
        {project.href ? "->" : ""}
      </span>
    </Tag>
  );
}

function ElsewhereItem({ link }) {
  return (
    <a
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noreferrer" : undefined}
      className="grid gap-2 py-3 transition hover:text-accent sm:grid-cols-[7.5rem_minmax(0,1fr)]"
    >
      <span className="text-sm text-muted">{link.label}</span>
      <span className="text-[1.25rem] leading-relaxed text-text sm:text-[1.4rem]">
        {link.description}
      </span>
    </a>
  );
}

function App() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="mx-auto w-full max-w-5xl px-6 py-6 sm:px-8 sm:py-8 lg:px-10">
        <header className="pb-10 sm:pb-12">
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Primary">
            {navigation.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>
        </header>

        <main>
          <section id="home" className="pb-12 sm:pb-16">
            <div className="space-y-5">
              <h1 className="text-[clamp(3.75rem,9vw,6rem)] font-bold leading-none tracking-[-0.06em] text-text">
                {siteData.identity.displayName}
              </h1>
              <p className="text-base text-muted sm:text-[1.2rem]">{siteData.intro.subtitle}</p>
            </div>

            <div className="mt-6 max-w-2xl space-y-2 text-[1.25rem] leading-relaxed text-text sm:mt-8 sm:text-[1.55rem]">
              {siteData.intro.summary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <Section
            id="blog"
            title={siteData.blog.title}
            actionHref={siteData.blog.actionHref}
            actionLabel={siteData.blog.actionLabel}
          >
            <div>
              {siteData.blog.items.map((item) => (
                <BlogItem key={item.title} item={item} />
              ))}
            </div>
          </Section>

          <Section
            id="work"
            title={siteData.work.title}
            actionHref={siteData.work.actionHref}
            actionLabel={siteData.work.actionLabel}
          >
            <div>
              {siteData.work.items.map((item) => (
                <WorkItem key={item.title} item={item} />
              ))}
            </div>
          </Section>

          <Section
            id="projects"
            title={siteData.projectsSection.title}
            actionHref={siteData.projectsSection.actionHref}
            actionLabel={siteData.projectsSection.actionLabel}
          >
            <div>
              {siteData.projects.map((project) => (
                <ProjectItem key={project.title} project={project} />
              ))}
            </div>
          </Section>

          <Section id="elsewhere" title="elsewhere" actionHref="#home" actionLabel="back home ->">
            <div>
              {siteData.links.map((link) => (
                <ElsewhereItem key={link.label} link={link} />
              ))}
            </div>
          </Section>
        </main>

        <footer className="border-t border-white/10 py-6 text-sm text-muted">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <p>{siteData.siteStack}</p>
            <p>{currentYear}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
