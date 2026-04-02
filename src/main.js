import {
  BufferGeometry,
  Clock,
  Group,
  LineBasicMaterial,
  LineLoop,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from "three";

const LINE_COLOR = 0x2f47ff;
const LATITUDES = [-60, -30, 0, 30, 60];
const MERIDIANS = 18;

const globeRoot = document.querySelector(".globe");

if (globeRoot) {
  initGlobe(globeRoot);
}

function initGlobe(container) {
  let renderer;

  try {
    renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
  } catch {
    container.hidden = true;
    return;
  }

  renderer.setClearAlpha(0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = "globe__canvas";
  container.append(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 1, 0.1, 10);
  camera.position.z = 4.2;

  const frame = new Group();
  frame.rotation.x = MathUtils.degToRad(18);
  scene.add(frame);

  const spinner = new Group();
  frame.add(spinner);

  const sphereGeometry = new SphereGeometry(1, 64, 32);
  const occluderMaterial = new MeshBasicMaterial();
  occluderMaterial.colorWrite = false;

  const backLines = createGlobeLines({
    color: LINE_COLOR,
    opacity: 0.18,
    depthTest: false,
  });
  const occluder = new Mesh(sphereGeometry, occluderMaterial);
  const frontLines = createGlobeLines({
    color: LINE_COLOR,
    opacity: 0.92,
    depthTest: true,
  });

  backLines.renderOrder = 0;
  occluder.renderOrder = 1;
  frontLines.renderOrder = 2;

  spinner.add(backLines);
  spinner.add(occluder);
  spinner.add(frontLines);

  const resize = () => {
    const { width, height } = container.getBoundingClientRect();

    if (!width || !height) {
      return;
    }

    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const clock = new Clock();
  let frameId = 0;

  const render = () => {
    frameId = window.requestAnimationFrame(render);
    const delta = Math.min(clock.getDelta(), 0.05);

    if (!reducedMotion.matches) {
      spinner.rotation.y += delta * 0.6;
    }

    renderer.render(scene, camera);
  };

  render();

  const cleanup = () => {
    window.cancelAnimationFrame(frameId);
    resizeObserver.disconnect();
    disposeLineGroup(backLines);
    disposeLineGroup(frontLines);
    sphereGeometry.dispose();
    occluderMaterial.dispose();
    renderer.dispose();
  };

  window.addEventListener("pagehide", cleanup, { once: true });
}

function createGlobeLines({ color, opacity, depthTest }) {
  const material = new LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthTest,
    depthWrite: false,
  });
  const group = new Group();
  const meridianGeometry = createMeridianGeometry();
  const geometries = [meridianGeometry];

  for (let index = 0; index < MERIDIANS; index += 1) {
    const meridian = new LineLoop(meridianGeometry, material);
    meridian.rotation.y = (index / MERIDIANS) * Math.PI;
    group.add(meridian);
  }

  for (const latitude of LATITUDES) {
    const latitudeGeometry = createLatitudeGeometry(latitude);
    const latitudeLine = new LineLoop(latitudeGeometry, material);

    geometries.push(latitudeGeometry);
    group.add(latitudeLine);
  }

  group.userData = { geometries, material };
  return group;
}

function createMeridianGeometry() {
  const points = [];
  const segments = 192;

  for (let index = 0; index < segments; index += 1) {
    const angle = (index / segments) * Math.PI * 2;
    points.push(new Vector3(Math.cos(angle), Math.sin(angle), 0));
  }

  return new BufferGeometry().setFromPoints(points);
}

function createLatitudeGeometry(latitudeDegrees) {
  const latitude = MathUtils.degToRad(latitudeDegrees);
  const points = [];
  const segments = 192;
  const radius = Math.cos(latitude);
  const y = Math.sin(latitude);

  for (let index = 0; index < segments; index += 1) {
    const angle = (index / segments) * Math.PI * 2;
    points.push(
      new Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius),
    );
  }

  return new BufferGeometry().setFromPoints(points);
}

function disposeLineGroup(group) {
  for (const geometry of group.userData.geometries) {
    geometry.dispose();
  }

  group.userData.material.dispose();
}
