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
import { createPlant, Plant } from "./plants/plants";
import { buildPlantMesh } from "./plantBuilder";

class FloraApp {
  private _scene: Scene;
  private _canvas: HTMLCanvasElement;
  private _camera: ArcRotateCamera;
  private _plant: Plant;

  constructor(canvas: HTMLCanvasElement, scene: Scene) {
    this._canvas = canvas;
    this._scene = scene;

    this._plant = createPlant();

    this._camera = this.createCamera();
    this.createScene();

    this.run()
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
      "Camera", 0, Math.PI / 4, 1, Vector3.Zero(),
      this._scene
    )
    camera.panningSensibility = 0;
    camera.allowUpsideDown = false;
    camera.lowerRadiusLimit = 0.1;
    camera.upperRadiusLimit = 50;
    camera.pinchDeltaPercentage = 0.01;
    camera.wheelDeltaPercentage = 0.01;
    camera.useNaturalPinchZoom = true;
    camera.maxZ = 100;
    camera.minZ = 0.001;
    camera.attachControl(this._canvas, true)
    return camera;
  }

  private createScene() {
    const groundMat = new StandardMaterial("groundMat", this._scene);
    groundMat.diffuseColor = new Color3(0, 0.1, 0);
    groundMat.specularColor = new Color3(0.2, 0.2, 0.2);

    const ground = MeshBuilder.CreateGround("ground", { width: 100, height: 100 }, this._scene)
    ground.material = groundMat;

    const light = new DirectionalLight("light", new Vector3(-0.2, -1.0, -0.2), this._scene);
    light.intensity = 2;

    this._scene.ambientColor = new Color3(0.5, 0.5, 0.5);

    buildPlantMesh({ plant: this._plant, scene: this._scene });

  }

};

export function createFloraApp({ canvas, scene }: SceneEventArgs) {
  return new FloraApp(canvas, scene);
}

