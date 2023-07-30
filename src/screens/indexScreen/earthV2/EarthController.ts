import * as THREE from "three";
import { GUI } from "dat.gui";
import earth_hd from "@src/public/earth/earth_hd.jpg";
import earth_10k from "@src/public/earth/earth_10k.jpg";
import { EARTH_CONSTS } from "./constants";
import { testPoints } from "./testPoints";
import { ObjectControls } from "@src/utils/tree/ObjectControls/ObjectControls";
import { Points, Position } from "@src/types/geo";

const initGui = async () => {
  const dat = await import("dat.gui");
  const gui = new dat.GUI();

  return gui;
};

class EarthController {
  earthControls = new THREE.Group();
  initCameraPosition = [0, 0, 0];
  ziroPoint: [number, number, number] = EARTH_CONSTS.ZIRO_POINT;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    EARTH_CONSTS.SIZE / EARTH_CONSTS.SIZE,
    0.1,
    1000
  );
  points = [];
  renderer = new THREE.WebGLRenderer({ alpha: true });
  container: HTMLElement | null;
  gui = null;
  constructor(container: HTMLElement) {
    this.container = container;
  }

  earth() {
    const geometry = new THREE.SphereGeometry(0.5, 32, 16);
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(earth_10k.src);
    const circleMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
    });
    const circle = new THREE.Mesh(geometry, circleMaterial);
    this.earthControls.add(circle);

    this.scene.add(this.earthControls);

    this.controls = new ObjectControls(
      this.scene,
      this.renderer.domElement,
      this.earthControls
    );
    this.controls.setZoomSpeed(0.5);
    this.controls.enableVerticalRotation();
    this.controls.setMaxVerticalRotationAngle(Math.PI * 2, Math.PI * 2);
    this.controls.setRotationSpeed(0.05);
    this.controls.setDistance(0, 5);
  }

  addLight() {
    const color = 0xffffff;
    const intensity = 1.65;
    const mainLight = new THREE.DirectionalLight(color, intensity);
    mainLight.position.set(267.5, 224, -220);
    mainLight.target.position.set(-5, 10, 10);
    this.scene.add(mainLight);
    this.scene.add(mainLight.target);
    this.mainLight = mainLight;

    const shadowColor = 0xffffff;
    const shadowIntencity = 0.05;
    const shadowLight = new THREE.DirectionalLight(
      shadowColor,
      shadowIntencity
    );
    shadowLight.target.position.set(0, 50, 50);
    this.scene.add(shadowLight);
    this.scene.add(shadowLight.target);
    this.shadowLight = shadowLight;
  }

  marker({ lon, lat, address }: Position) {
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
    this.scene.add(cylinder);
  }

  addMarkers(points: Points) {
    const updatePoints = points.reduce((points, point) => {
      const { lat, lon } = point;
      const isHasSamePoint = points.some(
        (point) => point.lat === lat && point.lon === lon
      );

      if (!isHasSamePoint) {
        points.push(point);
      }

      return points;
    }, this.points);

    this.points = updatePoints;

    this.points.forEach((point) => {
      this.marker(point);
    }, this);
  }

  removeMarkers(markerIds: string[]) {
    markerIds.forEach((id) => {
      const marker = this.scene.getObjectByName(id);

      this.scene.remove(marker);
    }, this);
  }

  init(points?: Points) {
    if (!this.container) return;
    initGui().then(({ gui, ObjectControls }) => {
      this.gui = gui;
      this.addLight();
      this.renderer.setSize(EARTH_CONSTS.SIZE, EARTH_CONSTS.SIZE);
      this.container.innerHTML = "";
      this.container.appendChild(this.renderer.domElement);

      this.camera.position.set(...this.initCameraPosition);
      this.camera.lookAt(0, 0, 0);
      this.camera.rotation.x = 0;
      this.camera.rotation.y = -3;
      this.camera.position.z = -1;

      const axesHelper = new THREE.AxesHelper(5);
      this.scene.add(axesHelper);
      this.earth(ObjectControls);
      this.animate();
      if (points) this.addMarkers(points);
    });
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}

export { EarthController };
