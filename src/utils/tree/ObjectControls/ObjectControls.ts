class ObjectControls {
  domElement: HTMLElement = document.body;
  camera;
  mesh;
  zoomSpeed: number = 0.5;
  minDistance: number = 6;
  maxDistance: number = 15;
  rotationSpeed: number = 0;
  rotationSpeedTouchDevices: number = 0.05;
  verticalRotationEnabled: boolean = false;
  horisontalRotationEnabled: boolean = true;
  zoomEnabled: boolean = true;
  isDragging: boolean = false;
  flag: any = "";
  MAX_ROTATON_ANGLES = {
    x: {
      enabled: false,
      from: Math.PI / 8,
      to: Math.PI / 8,
    },
    y: {
      enabled: false,
      from: Math.PI / 4,
      to: Math.PI / 4,
    },
  };
  mouseFlags = {
    MOUSEDOWN: 0,
    MOUSEMOVE: 1,
  };
  previousMousePosition = { x: 0, y: 0 };
  prevZoomDiff = { X: 0, Y: 0 };
  currentTouches: never[] = [];

  constructor(camera: THREE.Scene | THREE.Camera, domElement: HTMLElement, mesh: THREE.Mesh | THREE.Group) {
    this.camera = camera;
    this.domElement = domElement;
    this.mesh = mesh;
    this.start();
  }
  setMesh(mesh: THREE.Mesh) {
    this.mesh = mesh;
  }

  getMesh() {
    return this.mesh;
  }

  setZoomSpeed(zoomSpeed: number) {
    this.zoomSpeed = zoomSpeed;
  }

  setDistance(min: number, max: number) {
    this.minDistance = min;
    this.maxDistance = max;
  }

  setRotationSpeed(rotationSpeed: number) {
    this.rotationSpeed = rotationSpeed;
  }

  setRotationSpeedTouchDevices(rotationTouchDevices: number) {
    this.rotationSpeedTouchDevices = rotationTouchDevices;
  }

  enableVerticalRotation() {
    this.verticalRotationEnabled = true;
  }

  disableVerticalRotation() {
    this.verticalRotationEnabled = false;
  }

  enableHorisontalRotation() {
    this.horisontalRotationEnabled = true;
  }

  disableHorisontalRotation() {
    this.horisontalRotationEnabled = false;
  }

  setMaxVerticalRotationAngle(min: number, max: number) {
    this.MAX_ROTATON_ANGLES.x.from = min;
    this.MAX_ROTATON_ANGLES.x.to = max;
    this.MAX_ROTATON_ANGLES.x.enabled = true;
  }

  setMaxHorizontalRotationAngle(min: number, max: number) {
    this.MAX_ROTATON_ANGLES.y.from = min;
    this.MAX_ROTATON_ANGLES.y.to = max;
    this.MAX_ROTATON_ANGLES.y.enabled = true;
  }

  disableMaxHorizontalAngleRotation() {
    this.MAX_ROTATON_ANGLES.y.enabled = false;
  }

  disableMaxVerticalAngleRotation() {
    this.MAX_ROTATON_ANGLES.x.enabled = false;
  }

  disableZoom() {
    this.zoomEnabled = false;
  }

  enableZoom() {
    this.zoomEnabled = true;
  }

  isUserInteractionActive() {
    return this.isDragging;
  }

  zoomIn() {
    this.camera.position.z -= this.zoomSpeed;
  }

  zoomOut() {
    this.camera.position.z += this.zoomSpeed;
  }

  rotateVertical(deltaMove: Coords2D, mesh) {
    if (mesh.length > 1) {
      for (let i = 0; i < mesh.length; i++) {
        this.rotateVertical(deltaMove, mesh[i]);
      }
      return;
    }
    mesh.rotation.x += Math.sign(deltaMove.y) * this.rotationSpeed;
  }

  rotateVerticalTouch(deltaMove: Coords2D, mesh) {
    if (mesh.length > 1) {
      for (let i = 0; i < mesh.length; i++) {
        this.rotateVerticalTouch(deltaMove, mesh[i]);
      }
      return;
    }
    mesh.rotation.x += Math.sign(deltaMove.y) * this.rotationSpeedTouchDevices;
  }

  rotateHorizontal(deltaMove: Coords2D, mesh) {
    if (mesh.length > 1) {
      for (let i = 0; i < mesh.length; i++) {
        this.rotateHorizontal(deltaMove, mesh[i]);
      }
      return;
    }
    mesh.rotation.y += Math.sign(deltaMove.x) * this.rotationSpeed;
  }

  rotateHorizontalTouch(deltaMove: Coords2D, mesh) {
    if (mesh.length > 1) {
      for (let i = 0; i < mesh.length; i++) {
        this.rotateHorizontalTouch(deltaMove, mesh[i]);
      }
      return;
    }
    mesh.rotation.y += Math.sign(deltaMove.x) * this.rotationSpeedTouchDevices;
  }

  isWithinMaxAngle(delta: number, axe: keyof Coords2D) {
    if (this.MAX_ROTATON_ANGLES[axe].enabled) {
      if (this.mesh.length > 1) {
        let condition = true;
        for (let i = 0; i < this.mesh.length; i++) {
          if (!condition) return false;
          if (this.MAX_ROTATON_ANGLES[axe].enabled) {
            condition = this.isRotationWithinMaxAngles(
              this.mesh[i],
              delta,
              axe
            );
          }
        }
        return condition;
      }
      return this.isRotationWithinMaxAngles(this.mesh, delta, axe);
    }
    return true;
  }

  isRotationWithinMaxAngles(meshToRotate, delta: number, axe: keyof Coords2D) {
    return this.MAX_ROTATON_ANGLES[axe].from * -1 <
      meshToRotate.rotation[axe] + delta &&
      meshToRotate.rotation[axe] + delta < this.MAX_ROTATON_ANGLES[axe].to
      ? true
      : false;
  }

  resetMousePosition() {
    this.previousMousePosition = { x: 0, y: 0 };
  }

  mouseDown() {
    this.isDragging = true;
    this.flag = this.mouseFlags.MOUSEDOWN;
  }

  mouseMove(e) {
    if (this.isDragging) {
      const deltaMove = {
        x: e.offsetX - this.previousMousePosition.x,
        y: e.offsetY - this.previousMousePosition.y,
      };

      this.previousMousePosition = { x: e.offsetX, y: e.offsetY };

      if (this.horisontalRotationEnabled && deltaMove.x != 0) {
        if (
          !this.isWithinMaxAngle(
            Math.sign(deltaMove.x) * this.rotationSpeed,
            "y"
          )
        )
          return;
        this.rotateHorizontal(deltaMove, this.mesh);
        this.flag = this.mouseFlags.MOUSEMOVE;
      }

      if (this.verticalRotationEnabled && deltaMove.y != 0) {
        if (
          !this.isWithinMaxAngle(
            Math.sign(deltaMove.y) * this.rotationSpeed,
            "x"
          )
        )
          return;
        this.rotateVertical(deltaMove, this.mesh);
        this.flag = this.mouseFlags.MOUSEMOVE;
      }
    }
  }

  mouseUp() {
    this.isDragging = false;
    this.resetMousePosition();
  }

  wheel(e) {
    if (!this.zoomEnabled) return;
    const delta = e.wheelDelta ? e.wheelDelta : e.deltaY * -1;
    if (delta > 0 && this.camera.position.z > this.minDistance) {
      this.zoomIn();
    } else if (delta < 0 && this.camera.position.z < this.maxDistance) {
      this.zoomOut();
    }
  }

  onTouchStart(e) {
    e.preventDefault();
    this.flag = this.mouseFlags.MOUSEDOWN;
    if (e.touches.length === 2) {
      this.prevZoomDiff.X = Math.abs(
        e.touches[0].clientX - e.touches[1].clientX
      );
      this.prevZoomDiff.Y = Math.abs(
        e.touches[0].clientY - e.touches[1].clientY
      );
      this.currentTouches = new Array(2);
    } else {
      this.previousMousePosition = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY,
      };
    }
  }

  onTouchEnd(e) {
    this.prevZoomDiff.X = 0;
    this.prevZoomDiff.Y = 0;

    if (this.currentTouches.length > 0) {
      this.currentTouches.pop();
    } else {
      this.currentTouches = [];
    }
    e.preventDefault();
    if (this.flag === this.mouseFlags.MOUSEDOWN) {

    } else if (this.flag === this.mouseFlags.MOUSEMOVE) {

    }
    this.resetMousePosition();
  }

  onTouchMove(e) {
    e.preventDefault();
    this.flag = this.mouseFlags.MOUSEMOVE;

    if (e.touches.length === 2 && this.zoomEnabled) {
      this.currentTouches = new Array(2);

      const curDiffX = Math.abs(e.touches[0].clientX - e.touches[1].clientX);
      const curDiffY = Math.abs(e.touches[0].clientY - e.touches[1].clientY);

      if (
        this.prevZoomDiff &&
        this.prevZoomDiff.X > 0 &&
        this.prevZoomDiff.Y > 0
      ) {
        if (
          curDiffX > this.prevZoomDiff.X &&
          curDiffY > this.prevZoomDiff.Y &&
          this.camera.position.z > this.minDistance
        ) {
          this.zoomIn();
        } else if (
          curDiffX < this.prevZoomDiff.X &&
          this.camera.position.z < this.maxDistance &&
          curDiffY < this.prevZoomDiff.Y
        ) {
          this.zoomOut();
        }
      }
      this.prevZoomDiff.X = curDiffX;
      this.prevZoomDiff.Y = curDiffY;

    } else if (this.currentTouches.length === 0) {
      this.prevZoomDiff.X = 0;
      this.prevZoomDiff.Y = 0;
      const deltaMove = {
        x: e.touches[0].pageX - this.previousMousePosition.x,
        y: e.touches[0].pageY - this.previousMousePosition.y,
      };
      this.previousMousePosition = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY,
      };

      if (this.horisontalRotationEnabled && deltaMove.x != 0) {
        if (
          !this.isWithinMaxAngle(
            Math.sign(deltaMove.x) * this.rotationSpeedTouchDevices,
            "y"
          )
        )
          return;
        this.rotateHorizontalTouch(deltaMove, mesh);
      }

      if (this.verticalRotationEnabled && deltaMove.y != 0) {
        if (
          !this.isWithinMaxAngle(
            Math.sign(deltaMove.y) * this.rotationSpeedTouchDevices,
            "x"
          )
        )
          return;
        this.rotateVerticalTouch(deltaMove, mesh);
      }
    }
  }

  start() {
    this.domElement.addEventListener(
      "mousedown",
      this.mouseDown.bind(this),
      false
    );
    this.domElement.addEventListener(
      "mousemove",
      this.mouseMove.bind(this),
      false
    );
    this.domElement.addEventListener("mouseup", this.mouseUp.bind(this), false);
    this.domElement.addEventListener(
      "mouseout",
      this.mouseUp.bind(this),
      false
    );


    this.domElement.addEventListener("wheel", this.wheel.bind(this), false);


    this.domElement.addEventListener(
      "touchstart",
      this.onTouchStart.bind(this),
      false
    );
    this.domElement.addEventListener(
      "touchmove",
      this.onTouchMove.bind(this),
      false
    );
    this.domElement.addEventListener(
      "touchend",
      this.onTouchEnd.bind(this),
      false
    );
  }

  destroy() {
    this.domElement.removeEventListener(
      "mousedown",
      this.mouseDown.bind(this),
      false
    );
    this.domElement.removeEventListener(
      "mousemove",
      this.mouseMove.bind(this),
      false
    );
    this.domElement.removeEventListener(
      "mouseup",
      this.mouseUp.bind(this),
      false
    );
    this.domElement.removeEventListener(
      "mouseout",
      this.mouseUp.bind(this),
      false
    );

    this.domElement.removeEventListener("wheel", this.wheel.bind(this), false);

    this.domElement.removeEventListener(
      "touchstart",
      this.onTouchStart.bind(this),
      false
    );
    this.domElement.removeEventListener(
      "touchmove",
      this.onTouchMove.bind(this),
      false
    );
    this.domElement.removeEventListener(
      "touchend",
      this.onTouchEnd.bind(this),
      false
    );
  }
}

export { ObjectControls };
