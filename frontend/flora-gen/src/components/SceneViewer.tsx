import React, { Component } from "react";
import { Scene, Engine } from "react-babylonjs";
import {
  Color3,
  Vector3,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  StandardMaterial,
  UniversalCamera
} from "@babylonjs/core";
class SceneViewer extends Component {
  meshPicked(mesh: any) {
    console.log("mesh picked:", mesh);
  }

  onSceneMount(e: { canvas: any; scene: any }) {
    const { canvas, scene } = e;

    // Scene to build your environment, Canvas you need to attach your camera.
    var camera = new UniversalCamera(
      "Camera",
      new Vector3(5, 5, 10),
      scene
    );
    camera.setTarget(Vector3.Zero())
    camera.attachControl(canvas);

    var box=MeshBuilder.CreateBox("box", { size: 1 }, scene);
    box.position.y = 0.5

    var ground = MeshBuilder.CreateGround("ground", {width:10, height: 10}, scene)
    const groundMat = new StandardMaterial("groundMat", scene);
    groundMat.diffuseColor = new Color3(0, 1, 0);
    ground.material = groundMat; 
    
    new HemisphericLight("light", Vector3.Up(), scene);

    scene.getEngine().runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });
  }

  render() {
    return (
      <Engine
        antialias={true}
        adaptToDeviceRatio={true}
        canvasStyle={{
          width: "100%",
        }}
      >
        <Scene
          onMeshPicked={this.meshPicked}
          onSceneMount={this.onSceneMount}
        >
        </Scene>
      </Engine>
    );
  }
}

export default SceneViewer;
