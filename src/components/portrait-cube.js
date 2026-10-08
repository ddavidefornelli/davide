import "./portrait-cube.css";

const IDLE_DELAY = 1500;
const SPIN_DEGREES_PER_SECOND = 15;
const INITIAL_TILT_DEGREES = -12;

let nextCubeId = 0;

class PortraitCube extends HTMLElement {
  connectedCallback() {
    if (this.controller) return;

    const hintId = `cube-instructions-${nextCubeId++}`;
    const faces = ["front", "back", "left", "right", "top", "bottom"];

    this.innerHTML = `
      <div class="cube-stage" tabindex="0" role="group" data-lenis-prevent-touch
        aria-label="Interactive portrait cube" aria-describedby="${hintId}">
        <div class="cube-shadow" aria-hidden="true"></div>
        <div class="cube-position">
          <div class="portrait-cube" aria-hidden="true">
            ${faces.map((face) => `
              <img class="cube-face cube-face--${face}" src="/cube/${face}.webp"
                alt="" width="512" height="512" loading="lazy" draggable="false" />
            `).join("")}
          </div>
        </div>
      </div>
      <p class="cube-keyboard-hint" id="${hintId}">
        Automatically spins when idle. Drag to rotate. Shift and drag to move.
        Use arrow keys to rotate, Shift and arrow keys to move, or double-click
        or press Home to reset. Press Space to pause or resume automatic rotation.
      </p>
    `;

    const stage = this.querySelector(".cube-stage");
    const cube = this.querySelector(".portrait-cube");
    const position = { x: 0, y: 0 };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rotation = new DOMMatrix().rotate(INITIAL_TILT_DEGREES, 0, 0);
    let drag = null;
    let pointerOver = false;
    let autoSpinPaused = false;
    let inView = false;
    let previousTime = null;
    let lastInteraction = performance.now();

    const markInteraction = () => {
      lastInteraction = performance.now();
    };

    const render = () => {
      cube.style.transform = rotation.toString();
      stage.style.setProperty("--move-x", `${position.x}px`);
      stage.style.setProperty("--move-y", `${position.y}px`);
    };

    const constrainPosition = () => {
      // Bound every rotated corner, including perspective magnification when moved.
      const radius = cube.offsetWidth * Math.sqrt(3) / 2;
      const perspective = parseFloat(getComputedStyle(stage).perspective);
      const projection = 1 - radius / perspective;
      const maxX = Math.max(0, stage.clientWidth / 2 * projection - radius);
      const maxY = Math.max(0, stage.clientHeight / 2 * projection - radius);
      position.x = Math.max(-maxX, Math.min(maxX, position.x));
      position.y = Math.max(-maxY, Math.min(maxY, position.y));
    };

    const rotate = (dx, dy) => {
      // Pre-multiply so dragging always rotates around the screen axes, even upside down.
      rotation = new DOMMatrix().rotate(-dy * 0.6, dx * 0.6, 0).multiply(rotation);
    };

    const move = (dx, dy) => {
      position.x += dx;
      position.y += dy;
      constrainPosition();
    };

    const endDrag = () => {
      if (!drag) return;
      const pointerId = drag.id;
      drag = null;
      markInteraction();
      stage.classList.remove("is-dragging");
      if (stage.hasPointerCapture(pointerId)) stage.releasePointerCapture(pointerId);
    };

    const reset = () => {
      endDrag();
      rotation = new DOMMatrix().rotate(INITIAL_TILT_DEGREES, 0, 0);
      position.x = position.y = 0;
      markInteraction();
      render();
    };

    this.controller = new AbortController();
    const options = { signal: this.controller.signal };

    stage.addEventListener("pointerenter", (event) => {
      pointerOver = event.pointerType !== "touch";
    }, options);

    stage.addEventListener("pointerleave", () => {
      pointerOver = false;
      markInteraction();
    }, options);

    stage.addEventListener("focus", markInteraction, options);
    reducedMotion.addEventListener("change", markInteraction, options);
    document.addEventListener("visibilitychange", markInteraction, options);

    stage.addEventListener("pointerdown", (event) => {
      if (drag || event.button !== 0 || !event.target.closest(".portrait-cube")) return;
      event.preventDefault();
      markInteraction();
      stage.focus({ preventScroll: true });
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY, move: event.shiftKey };
      stage.setPointerCapture(event.pointerId);
      stage.classList.add("is-dragging");
    }, options);

    stage.addEventListener("pointermove", (event) => {
      if (!drag || event.pointerId !== drag.id) return;
      markInteraction();
      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      drag.x = event.clientX;
      drag.y = event.clientY;
      if (drag.move) move(dx, dy);
      else rotate(dx, dy);
      render();
    }, options);

    for (const type of ["pointerup", "pointercancel", "lostpointercapture"]) {
      stage.addEventListener(type, (event) => {
        if (drag?.id === event.pointerId) endDrag();
      }, options);
    }

    stage.addEventListener("dblclick", reset, options);

    stage.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        if (!event.repeat) autoSpinPaused = !autoSpinPaused;
        markInteraction();
        return;
      }
      if (event.key === "Home") {
        event.preventDefault();
        reset();
        return;
      }
      const directions = { ArrowLeft: [-16, 0], ArrowRight: [16, 0], ArrowUp: [0, -16], ArrowDown: [0, 16] };
      const direction = directions[event.key];
      if (!direction) return;
      event.preventDefault();
      markInteraction();
      if (event.shiftKey) move(...direction);
      else rotate(...direction);
      render();
    }, options);

    this.observer = new ResizeObserver(() => {
      constrainPosition();
      render();
    });
    this.observer.observe(stage);
    this.visibilityObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) markInteraction();
    });
    this.visibilityObserver.observe(stage);
    render();

    const animate = (time) => {
      const elapsed = previousTime === null ? 0 : Math.min(time - previousTime, 100);
      previousTime = time;

      if (inView && !document.hidden && !reducedMotion.matches &&
          !drag && !pointerOver && !autoSpinPaused && time - lastInteraction >= IDLE_DELAY) {
        rotation = new DOMMatrix()
          .rotate(0, SPIN_DEGREES_PER_SECOND * elapsed / 1000, 0)
          .multiply(rotation);
        render();
      }

      this.animationFrame = requestAnimationFrame(animate);
    };
    this.animationFrame = requestAnimationFrame(animate);
  }

  disconnectedCallback() {
    this.controller?.abort();
    this.observer?.disconnect();
    this.visibilityObserver?.disconnect();
    cancelAnimationFrame(this.animationFrame);
    this.animationFrame = null;
    this.controller = null;
  }
}

if (!customElements.get("portrait-cube")) {
  customElements.define("portrait-cube", PortraitCube);
}
