import "./style.css";
import { inject } from "@vercel/analytics";
import { projectCollection } from "./data/portfolio-data.js";
import "./components/portfolio-card.js";

inject({
  mode: import.meta.env.DEV ? "development" : "production",
});

document.documentElement.classList.add("lenis", "lenis-smooth");

let lenis;

async function initLenis() {
  const Lenis = (await import("@studio-freight/lenis")).default;
  lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

initLenis();

console.log(`████████▄     ▄████████  ▄█    █▄   ▄█  ████████▄     ▄████████         ▄████████  ▄██████▄     ▄████████ ███▄▄▄▄      ▄████████  ▄█        ▄█        ▄█  `);
console.log(`███   ▀███   ███    ███ ███    ███ ███  ███   ▀███   ███    ███        ███    ███ ███    ███   ███    ███ ███▀▀▀██▄   ███    ███ ███       ███       ███  `);
console.log(`███    ███   ███    ███ ███    ███ ███▌ ███    ███   ███    █▀         ███    █▀  ███    ███   ███    ███ ███   ███   ███    █▀  ███       ███       ███▌ `);
console.log(`███    ███   ███    ███ ███    ███ ███▌ ███    ███  ▄███▄▄▄           ▄███▄▄▄     ███    ███  ▄███▄▄▄▄██▀ ███   ███  ▄███▄▄▄     ███       ███       ███▌ `);
console.log(`███    ███ ▀███████████ ███    ███ ███▌ ███    ███ ▀▀███▀▀▀          ▀▀███▀▀▀     ███    ███ ▀▀███▀▀▀▀▀   ███   ███ ▀▀███▀▀▀     ███       ███       ███▌ `);
console.log(`███    ███   ███    ███ ███    ███ ███  ███    ███   ███    █▄         ███        ███    ███ ▀███████████ ███   ███   ███    █▄  ███       ███       ███  `);
console.log(`███   ▄███   ███    ███ ███    ███ ███  ███   ▄███   ███    ███        ███        ███    ███   ███    ███ ███   ███   ███    ███ ███▌    ▄ ███▌    ▄ ███  `);
console.log(`████████▀    ███    █▀   ▀██████▀  █▀   ████████▀    ██████████        ███         ▀██████▀    ███    ███  ▀█   █▀    ██████████ █████▄▄██ █████▄▄██ █▀   `);
console.log(`                                                                                               ███    ███                        ▀         ▀              `);
const cardsRoot = document.querySelector("#portfolio-cards");

const cards = [
  ...projectCollection.map((project) => ({
    title: project.title,
    description: project.description,
    href: project.href,
    target: project.href ? "_blank" : undefined,
    rel: project.href ? "noopener noreferrer" : undefined,
  })),
];

if (cardsRoot) {
  const fragment = document.createDocumentFragment();

  cards.forEach((card) => {
    const cardElement = document.createElement("portfolio-card");
    cardElement.cardData = card;
    fragment.append(cardElement);
  });

  cardsRoot.replaceChildren(fragment);
}
