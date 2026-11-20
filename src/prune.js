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

const timeline = document.querySelector("#log-timeline");
pruneLog.entries.forEach((entry) => {
  const item = el("li", "timeline__item");
  item.append(el("p", "timeline__date", entry.date));

  const body = el("div", "timeline__body");
  body.append(el("h3", "timeline__title", entry.title));
  const list = el("ul", "timeline__points");
  entry.points.forEach((point) => list.append(el("li", null, point)));
  body.append(list);

  item.append(body);
  timeline.append(item);
});
