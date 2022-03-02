import "pepjs";
import {
  Scene,
  Color3,
  Vector3,
  MeshBuilder,
  ArcRotateCamera,
  DirectionalLight,
} from "@babylonjs/core";
import { SceneEventArgs } from "react-babylonjs";
import { Leaf } from "./structure/Leaf";
import { LeafMesh } from "./geometry/LeafMesh";

export class LeafApp {
  private _scene: Scene;
  private _canvas: HTMLCanvasElement;
  private _camera: ArcRotateCamera;
  private _cameraTargetNode: number = 0;

  private _leaf: Leaf;
  private _leaf_mesh: LeafMesh;
  
  get scene(): Scene {
    return this._scene;
  }

  constructor(canvas: HTMLCanvasElement, scene: Scene) {
    this._canvas = canvas;
    this._scene = scene;

    this._camera = this.createCamera();
    this._leaf = new Leaf();
    this._leaf_mesh = new LeafMesh(this._leaf, this._scene);

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
      -Math.PI / 2,
      Math.PI / 2,
      1,
      Vector3.Zero(),
      this._scene
    );
    camera.panningSensibility = 0;
    camera.allowUpsideDown = false;
    camera.lowerRadiusLimit = 0.1;
    camera.upperRadiusLimit = 1;
    camera.upperAlphaLimit = camera.alpha + 0.01;
    camera.lowerAlphaLimit = camera.alpha - 0.01;
    camera.upperBetaLimit = camera.beta + 0.01;
    camera.lowerBetaLimit = camera.beta - 0.01;
    camera.pinchDeltaPercentage = 0.01;
    camera.wheelDeltaPercentage = 0.01;
    camera.useNaturalPinchZoom = true;
    camera.maxZ = 100;
    camera.minZ = 0.001;
    camera.attachControl(this._canvas, true);
    return camera;
  }

  private createScene() {
    const light = new DirectionalLight("light", Vector3.Forward(), this._scene);
    light.intensity = 1;

    this._scene.ambientColor = new Color3(0.5, 0.5, 0.5);


  //   const edge = [
  //     Vector3.Zero(),
  //     new Vector3(-0.05, 0.1, 0.0),
  //     new Vector3(-0.02, 0.2, 0.0),
  //     new Vector3(0.1, 0.3, 0.0),
  //     new Vector3(0.2, 0.2, 0.0),
  //     new Vector3(0.5, 0.1, 0.0),
  //   ];
  //   edge.push(edge[0]);
  //   const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 0.01 });
  //   sphere.position = edge[0];
  //   for (var p = 1; p < edge.length; p++) {
  //     const point = sphere.createInstance("");
  //     point.position = edge[p];
  //   }
  //   const lines = MeshBuilder.CreateLines("edge", { points: edge });
  }
}

export function createLeafApp({ canvas, scene }: SceneEventArgs) {
  return new LeafApp(canvas, scene);
}
