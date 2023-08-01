import * as THREE from "three";
import { GUI } from "dat.gui";
import earth_hd from "@src/public/earth/earth_hd.jpg";
import earth_10k from "@src/public/earth/earth_10k.jpg";
import { EARTH_CONSTS } from "./constants";
import { ObjectControls } from "@src/utils/tree/ObjectControls/ObjectControls";
import { Points, Position } from "@src/types/geo";
import { BaseTree } from "@src/utils/tree/Base/Base";

const initGui = async () => {
  const dat = await import("dat.gui");
  const gui = new dat.GUI();

  return gui;
};

class EarthController extends BaseTree {
  isLoading = false;
  mainLight: THREE.DirectionalLight | null = null;
  shadowLight: THREE.DirectionalLight | null = null;
  renderProcess: boolean = false;
  earthControls = new THREE.Group();
  initCameraPosition: [number, number, number] = [0, 0, 0];
  ziroPoint: [number, number, number] = EARTH_CONSTS.ZIRO_POINT;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    EARTH_CONSTS.SIZE / EARTH_CONSTS.SIZE,
    0.1,
    1000
  );
  points: Points = [];
  renderer = new THREE.WebGLRenderer({ alpha: true });
  container: HTMLElement | null;
  gui: GUI | null = null;
  controls: any;
  constructor(container: HTMLElement) {
    super();
    this.container = container;
    this.init();
  }

  earth() {
    this.set("isLoading", true);
    const geometry = new THREE.SphereGeometry(0.5, 32, 16);
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.loadAsync(earth_10k.src);
    earthTexture.then((texture) => {
      const circleMaterial = new THREE.MeshStandardMaterial({
        map: texture,
      });
      const circle = new THREE.Mesh(geometry, circleMaterial);
      this.earthControls.add(circle);
      this.scene.add(this.earthControls);
      this.set("isLoading", false);
    });
  }

  addLight() {
    const color = 0xffffff;
    const intensity = 1.65;
    const mainLight = new THREE.DirectionalLight(color, intensity);
    mainLight.position.set(267.5, 224, -220);
    mainLight.target.position.set(-5, 10, 10);
    this.scene.add(mainLight);
    this.scene.add(mainLight.target);
    this.set("mainLight", mainLight);

    const shadowColor = 0xffffff;
    const shadowIntencity = 0.05;
    const shadowLight = new THREE.DirectionalLight(
      shadowColor,
      shadowIntencity
    );
    shadowLight.target.position.set(0, 50, 50);
    this.scene.add(shadowLight);
    this.scene.add(shadowLight.target);
    this.set("shadowLight", shadowLight);
  }

  marker({ lon, lat, address }: Position) {
    const earthControls = this.get('earthControls')
    const R = 0.5;
    lat = (Math.PI * lat) / 180;
    lon = (Math.PI * lon) / 180;

    lat -= -1.581;
    lon -= -0.003;

    const x = R * Math.sin(lat) * Math.cos(lon);
    const y = R * Math.cos(lat);
    const z = R * Math.sin(lat) * Math.sin(lon);

    const geometry = new THREE.CylinderGeometry(0.003, 0.001, 0.15, 5);
    const material = new THREE.MeshBasicMaterial({
      color: "rgb(255, 255, 255)",
    });
    const cylinder = new THREE.Mesh(geometry, material);

    cylinder.position.set(x, -y, -z);
    cylinder.rotation.x = x / 100;
    cylinder.rotation.y = y * 1.5;
    cylinder.rotation.z = -x * 3;
    cylinder.name = address;
    earthControls.add(cylinder);
  }

  addMarkers(points: Points) {
    const updatePoints = points.reduce((points: Points, point) => {
      const { lat, lon } = point;
      const isHasSamePoint = points.some(
        (point) => point.lat === lat && point.lon === lon
      );

      if (!isHasSamePoint) {
        points.push(point);
      }

      return points;
    }, this.points);


    this.set("points", updatePoints);

    this.points.forEach((point) => {
      this.marker(point);
    }, this);
  }

  removeMarkers(markerIds: string[]) {
    markerIds.forEach((id) => {
      const marker = this.scene.getObjectByName(id);

      if (marker) this.scene.remove(marker);
    }, this);
  }

  init(points?: Points) {
    initGui().then((gui) => {
      const container = this.get("container");
      const renderer = this.get("renderer");
      const camera = this.get("camera");
      const scene = this.get("scene");
      if (!container) return;
      this.set("renderProcess", true);
      this.set("gui", gui);
      this.addLight();
      renderer.setSize(EARTH_CONSTS.SIZE, EARTH_CONSTS.SIZE);
      container.innerHTML = "";
      container.appendChild(renderer.domElement);

      const initialCameraPosition: EarthController["initCameraPosition"] =
        this.get("initCameraPosition");

      camera.position.set(...initialCameraPosition);
      camera.lookAt(0, 0, 0);
      camera.rotation.x = 0;
      camera.rotation.y = -3;
      camera.position.z = -1;

      const axesHelper = new THREE.AxesHelper(5);
      scene.add(axesHelper);
      this.earth();
      this.animate();
      if (points) this.addMarkers(points);

      const controls: EarthController["controls"] = this.set(
        "controls",
        new ObjectControls(scene, renderer.domElement, this.earthControls)
      );

      controls.setZoomSpeed(0.5);
      controls.enableVerticalRotation();
      controls.setMaxVerticalRotationAngle(Math.PI * 2, Math.PI * 2);
      controls.setRotationSpeed(0.05);
      controls.setDistance(0, 5);
    });
  }

  onExit() {
    const controls: EarthController["controls"] = this.get("controls");
    controls.destroy();
    this.set("renderProcess", false);
  }

  animate() {
    if (!this.renderProcess) return;
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}

export { EarthController };
