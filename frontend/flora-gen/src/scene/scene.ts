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
import Path, { smooth_path } from './geometry/path'

class FloraApp {
  private _scene: Scene;
  private _canvas: HTMLCanvasElement;
  private _camera: ArcRotateCamera;

  constructor(canvas: HTMLCanvasElement, scene: Scene) {
    this._canvas = canvas;
    this._scene = scene;

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
      "Camera", 0, Math.PI / 4, 50, Vector3.Zero(),
      this._scene
    );
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
    const path = new Path(new Vector3(0, 0, 0), new Vector3(0, 2, 0), new Vector3(0, 3, -6), new Vector3(3, 5, 5), new Vector3(-4, 8. - 0.5),
    );
    const smoothed = smooth_path(path);
    const tube = MeshBuilder.CreateTube("tube", { path: smoothed, radius: 0.25 }, this._scene);
    const tubeMat = new StandardMaterial("tubeMat", this._scene);
    tubeMat.ambientColor = new Color3(0.85, 0.85, 0.5);
    tube.material = tubeMat;

    this._scene.ambientColor = new Color3(0.5, 0.5, 0.5);


  }

};

export function createFloraApp({ canvas, scene }: SceneEventArgs) {
  return new FloraApp(canvas, scene);
}

