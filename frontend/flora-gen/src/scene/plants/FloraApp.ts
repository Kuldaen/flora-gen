import "pepjs";
import {
  Scene,
  Color3,
  Vector3,
  MeshBuilder,
  StandardMaterial,
  ArcRotateCamera,
  DirectionalLight,
} from "@babylonjs/core";
import { SceneEventArgs } from "react-babylonjs";

import { createPlant, Plant } from "./structure/Plant";
import { BuildPlantVisuals } from "./geometry/BuildPlantVisuals";
import { MetamerMesh } from "./geometry/MetamerMesh";

import { CreateUI } from "./ui/CreateUI";

export class FloraApp {
  private _scene: Scene;
  private _canvas: HTMLCanvasElement;
  private _camera: ArcRotateCamera;
  private _plant: Plant;
  private _plantNodes: Array<MetamerMesh> = [];
  private _cameraTargetNode: number = 0;

  get scene(): Scene {
    return this._scene;
  }

  constructor(canvas: HTMLCanvasElement, scene: Scene) {
    this._canvas = canvas;
    this._scene = scene;

    this._plant = createPlant();

    this._camera = this.createCamera();
    this.createScene();

    this.run();
  }

  private run() {
    this._scene.getEngine().runRenderLoop(() => {
      if (this._scene) {
        this._scene.render();
      }
    });
  }

  private createCamera() {
    const camera = new ArcRotateCamera(
      "Camera",
      0,
      Math.PI / 4,
      1,
      Vector3.Zero(),
      this._scene
    );
    camera.panningSensibility = 0;
    camera.allowUpsideDown = false;
    camera.lowerRadiusLimit = 0.1;
    camera.upperRadiusLimit = 50;
    camera.pinchDeltaPercentage = 0.01;
    camera.wheelDeltaPercentage = 0.01;
    camera.useNaturalPinchZoom = true;
    camera.maxZ = 100;
    camera.minZ = 0.001;
    camera.attachControl(this._canvas, true);
    return camera;
  }

  private createScene() {
    const groundMat = new StandardMaterial("groundMat", this._scene);
    groundMat.diffuseColor = new Color3(0, 0.1, 0);
    groundMat.specularColor = new Color3(0.2, 0.2, 0.2);

    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 100, height: 100 },
      this._scene
    );
    ground.material = groundMat;
    ground.position.y = -0.01;

    const light = new DirectionalLight(
      "light",
      new Vector3(-0.2, -1.0, -0.2),
      this._scene
    );
    light.intensity = 1;

    this._scene.ambientColor = new Color3(0.5, 0.5, 0.5);

    this._plantNodes = BuildPlantVisuals(this._plant, this._scene);

    this.updateCameraTarget();
    CreateUI(this);
  }

  private updateCameraTarget() {
    const node = this._plantNodes.at(this._cameraTargetNode);
    if (node) {
      const newPos = this._camera.position.subtract(this._camera.target);
      this._camera.setTarget(node.position);
      this._camera.setPosition(node.position.add(newPos));
    }
  }

  public setCameraTargetUp() {
    if(this._cameraTargetNode < this._plantNodes.length-1){
      this._cameraTargetNode += 1;
    }
    this.updateCameraTarget();
  }

  public setCameraTargetDown() {
    if(this._cameraTargetNode > 0){
      this._cameraTargetNode -= 1;
    }
    this.updateCameraTarget();
  }
}

export function createFloraApp({ canvas, scene }: SceneEventArgs) {
  return new FloraApp(canvas, scene);
}
