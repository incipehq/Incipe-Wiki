/**
 * One INCIPE module (or the board) in a small three.js scene — shared by the
 * Wiki's interactive viewer and by `scripts/models.mjs`, which renders the same
 * scene headless to make the still thumbnails. Loaded lazily: three.js is only
 * fetched on a page that shows a model.
 *
 * Models are meshopt-compressed (`npm run models`); the decoder is three's own
 * bundled module, so nothing is fetched from a CDN.
 */
import type { BufferAttribute, Mesh } from 'three';
import {
  ACESFilmicToneMapping,
  Box3,
  DirectionalLight,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export interface MountOptions {
  /** Orbit with pointer / touch, and turn slowly until the user does. */
  interactive?: boolean;
  /** For the headless thumbnail render: keep the frame readable by `toDataURL`. */
  preserveDrawingBuffer?: boolean;
  onReady?: () => void;
  onError?: (error: unknown) => void;
}

/** Three-quarter view from above: modules are flat plates, so a low angle hides them. */
const AZIMUTH = (-35 * Math.PI) / 180;
const ELEVATION = (38 * Math.PI) / 180;
const FOV = 30;
/** Share of the frame the model may fill. */
const FIT_MARGIN = 0.86;

export function mountModel(host: HTMLElement, url: string, options: MountOptions = {}): () => void {
  const { interactive = true, preserveDrawingBuffer = false, onReady, onError } = options;
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  const renderer = new WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  host.appendChild(renderer.domElement);

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = environment;
  const key = new DirectionalLight(0xffffff, 1.4);
  key.position.set(-1, 2, 1.5);
  scene.add(key);

  const camera = new PerspectiveCamera(FOV, 1, 0.0001, 100);
  const controls = interactive ? new OrbitControls(camera, renderer.domElement) : null;
  if (controls) {
    controls.enableDamping = true;
    controls.enablePan = false;
    // No wheel zoom: it would capture the page's scroll whenever the pointer
    // crossed the model.
    controls.enableZoom = false;
    controls.autoRotate = !reduceMotion;
    controls.autoRotateSpeed = 1.1;
    controls.addEventListener('start', () => {
      controls.autoRotate = false;
    });
  }

  let frame = 0;
  let disposed = false;
  const render = () => {
    controls?.update();
    renderer.render(scene, camera);
  };
  const loop = () => {
    if (disposed) return;
    render();
    frame = requestAnimationFrame(loop);
  };

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = host;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    render();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();

  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  loader.load(
    url,
    (gltf) => {
      if (disposed) return;
      const model = gltf.scene;
      const box = new Box3().setFromObject(model, true);
      const centre = box.getCenter(new Vector3());
      model.position.sub(centre);
      scene.add(model);

      // Fit to the model's own silhouette, not its bounding box: a box's empty
      // corners (beside a joystick's stick, say) would leave it small and
      // off-centre. Sample the vertices, then project → recentre → rescale
      // until their on-screen bounds fill the margin.
      model.updateMatrixWorld(true);
      const points: Vector3[] = [];
      model.traverse((object) => {
        const mesh = object as Mesh;
        const position = mesh.isMesh ? (mesh.geometry.getAttribute('position') as BufferAttribute | undefined) : undefined;
        if (!position) return;
        const step = Math.max(1, Math.floor(position.count / 2000));
        for (let i = 0; i < position.count; i += step) {
          points.push(new Vector3().fromBufferAttribute(position, i).applyMatrix4(mesh.matrixWorld));
        }
      });
      const dir = new Vector3(
        Math.cos(ELEVATION) * Math.sin(AZIMUTH),
        Math.sin(ELEVATION),
        Math.cos(ELEVATION) * Math.cos(AZIMUTH),
      );
      const target = new Vector3();
      const radius = box.getSize(new Vector3()).length() / 2;
      let distance = radius / Math.sin((FOV * Math.PI) / 360);
      const projected = new Vector3();
      for (let pass = 0; pass < 4; pass += 1) {
        camera.position.copy(target).addScaledVector(dir, distance);
        camera.lookAt(target);
        camera.updateMatrixWorld();
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        for (const point of points) {
          projected.copy(point).project(camera);
          minX = Math.min(minX, projected.x); maxX = Math.max(maxX, projected.x);
          minY = Math.min(minY, projected.y); maxY = Math.max(maxY, projected.y);
        }
        // NDC → world at the target's depth, along the camera's own axes.
        const tanHalfV = Math.tan((FOV * Math.PI) / 360);
        const right = new Vector3().setFromMatrixColumn(camera.matrixWorld, 0);
        const up = new Vector3().setFromMatrixColumn(camera.matrixWorld, 1);
        target
          .addScaledVector(right, ((minX + maxX) / 2) * distance * tanHalfV * camera.aspect)
          .addScaledVector(up, ((minY + maxY) / 2) * distance * tanHalfV);
        distance *= Math.max((maxX - minX) / 2, (maxY - minY) / 2) / FIT_MARGIN;
      }
      camera.position.copy(target).addScaledVector(dir, distance);
      camera.near = distance / 100;
      camera.far = distance * 10;
      camera.updateProjectionMatrix();
      camera.lookAt(target);
      if (controls) {
        controls.target.copy(target);
        controls.update();
      }
      render();
      onReady?.();
      if (interactive) loop();
    },
    undefined,
    (error) => onError?.(error),
  );

  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    controls?.dispose();
    environment.dispose();
    pmrem.dispose();
    scene.traverse((object) => {
      const mesh = object as { geometry?: { dispose(): void }; material?: { dispose(): void } | { dispose(): void }[] };
      mesh.geometry?.dispose();
      const material = mesh.material;
      if (Array.isArray(material)) material.forEach((m) => m.dispose());
      else material?.dispose();
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
