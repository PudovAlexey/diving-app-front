import * as THREE from "three";
import { OrbitControls } from "@three-ts/orbit-controls";
import earth_hd from "@src/public/earth/earth_hd.jpg";

export class EarthController {
  scene;
  camera;
  renderer;
  controls;
  skybox;
  sphere;
  el: HTMLElement;

  constructor(el) {
    this.el = el;
  }

  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      85,
      window.innerWidth / window.innerHeight,
      0.5,
      1000
    );

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.el.appendChild(this.renderer.domElement);
    this.renderer.domElement.id = "c";

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    OrbitControls.minDistance = 5;
    OrbitControls.maxDistance = 100;

    this.loadTexture(earth_hd.src);
    this.scene.add(this.sphere);
    this.marker();

    this.camera.position.z = 12;
  }

  loadTexture(texture: string) {
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const loader = new THREE.TextureLoader();
    const earthTexture = loader.load(texture);
    const material = new THREE.MeshBasicMaterial({ map: earthTexture });

    this.sphere = new THREE.Mesh(geometry, material);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.sphere.rotation.y += 0.0;
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  marker() {
    const geometry = new THREE.CircleGeometry(0.07, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.z += 5;
    cube.position.y += -1;
    cube.position.x += 6;
    this.scene.add(cube);
  }

  start() {
    this.init();
    this.animate();
  }
}
