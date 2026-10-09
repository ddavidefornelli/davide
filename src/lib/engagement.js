const recorded = new Set();
let analytics;


function optedOut() {
  return navigator.doNotTrack === "1" || navigator.globalPrivacyControl === true;
}

// Count engagement once per action per page load, not every movement/key repeat.
export function trackOnce(name, properties = {}) {
  if (optedOut()) return;
  const key = JSON.stringify([name, properties]);
  if (recorded.has(key)) return;
  recorded.add(key);
  analytics?.then((module) => module?.track(name, properties)).catch(() => {});
}

export function initAnalytics() {
  if (optedOut()) return;

  // Analytics is optional: a blocked SDK must not stop CSS or components loading.
  analytics = import("@vercel/analytics").then((module) => {
    if (optedOut()) return null;
    module.inject({
      mode: import.meta.env.DEV ? "development" : "production",
      beforeSend(event) {
        if (optedOut()) return null;
        // Avoid sending query parameters or fragments that could contain personal data.
        const url = new URL(event.url);
        url.search = "";
        url.hash = "";
        return { ...event, url: url.toString() };
      },
    });
    return module;
  }).catch(() => null);

  const trackLink = (event) => {
    if (event.type === "auxclick" && event.button !== 1) return;
    const link = event.target.closest?.("a");
    if (!link) return;
    if (link.dataset.analytics) {
      trackOnce("Primary link clicked", { link: link.dataset.analytics });
    } else if (link.closest("#portfolio-cards")) {
      const project = link.querySelector(".card__title")?.textContent;
      if (project) trackOnce("Project clicked", { project });
    }
  };
  document.addEventListener("click", trackLink);
  document.addEventListener("auxclick", trackLink);

  const projects = document.querySelector("#portfolio-heading");
  if (projects && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      trackOnce("Projects viewed");
      observer.disconnect();
    }, { threshold: 1 });
    observer.observe(projects);
  }
}
