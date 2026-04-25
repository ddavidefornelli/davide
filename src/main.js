import { projectCollection } from "./data/portfolio-data.js";
import "./components/portfolio-card.js";

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

const cursorBall = document.createElement('div');
cursorBall.className = 'cursor-ball';
document.body.appendChild(cursorBall);

let mouseX = 0;
let mouseY = 0;
let ballX = 0;
let ballY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.addEventListener('mouseover', (e) => {
  const tag = e.target.tagName.toLowerCase();
  if (tag === 'a' || tag === 'button' || e.target.closest('a') || e.target.closest('button')) {
    cursorBall.style.backgroundImage = 'url("/Cat Hello GIF.gif")';
  }
});

document.addEventListener('mouseout', (e) => {
  const tag = e.target.tagName.toLowerCase();
  if (tag === 'a' || tag === 'button' || e.target.closest('a') || e.target.closest('button')) {
    cursorBall.style.backgroundImage = 'url("/Cat Working GIF.gif")';
  }
});

function animate() {
  ballX += (mouseX - ballX) * 0.15;
  ballY += (mouseY - ballY) * 0.15;
  cursorBall.style.left = ballX + 'px';
  cursorBall.style.top = ballY + 'px';
  requestAnimationFrame(animate);
}
animate();

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
