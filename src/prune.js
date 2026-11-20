import "./style.css";
import { initAnalytics } from "./lib/engagement.js";
import { pruneLog } from "./data/prune-log.js";

initAnalytics();

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

document.querySelector("#log-title").textContent = pruneLog.title;
document.querySelector("#log-summary").textContent = pruneLog.summary;

const facts = document.querySelector("#log-facts");
pruneLog.facts.forEach(({ label, value }) => {
  const row = el("div", "log-facts__row");
  row.append(el("dt", null, label), el("dd", null, value));
  facts.append(row);
});

const highlights = document.querySelector("#log-highlights");
pruneLog.highlights.forEach(({ value, label }) => {
  const item = el("li", "stat");
  item.append(el("p", "stat__value", value), el("p", "stat__label", label));
  highlights.append(item);
});

const { funnel } = pruneLog;
document.querySelector("#log-funnel-title").textContent = funnel.title;
const funnelList = document.querySelector("#log-funnel");
const top = funnel.steps[0].value;
funnel.steps.forEach(({ label, value }, index) => {
  const row = el("li", "funnel__row");
  const share = index === 0 ? "" : `${((value / top) * 100).toFixed(1)}%`;
  const bar = el("span", "funnel__bar");
  bar.style.setProperty("--w", `${(value / top) * 100}%`);
  row.append(
    el("span", "funnel__label", label),
    el("span", "funnel__track"),
    el("span", "funnel__value", value.toLocaleString("en-US")),
    el("span", "funnel__share", share),
  );
  row.querySelector(".funnel__track").append(bar);
  funnelList.append(row);
});

const timeline = document.querySelector("#log-timeline");
pruneLog.entries.forEach((entry) => {
  const item = el("li", "timeline__item");
  item.append(el("p", "timeline__date", entry.date));

  const body = el("div", "timeline__body");
  body.append(el("h3", "timeline__title", entry.title));
  const list = el("ul", "timeline__points");
  entry.points.forEach((point) => list.append(el("li", null, point)));
  body.append(list);

  if (entry.results?.length) {
    const results = el("div", "timeline__results");
    results.append(el("p", "timeline__results-label", "result"));
    entry.results.forEach((result) => results.append(el("p", null, result)));
    body.append(results);
  }

  item.append(body);
  timeline.append(item);
});

document.querySelector("#log-open-problem").textContent = pruneLog.openProblem;
document.querySelector("#log-method").textContent = pruneLog.method;
