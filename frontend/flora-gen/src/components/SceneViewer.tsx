import { Component } from "react";
import { Scene, Engine } from "react-babylonjs";
import { handleScene } from "../scene/scene";

class SceneViewer extends Component {
  onSceneMount( e : { canvas: any; scene: any }): void {
    handleScene(e);
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
        <Scene onSceneMount={this.onSceneMount}>
        </Scene>
      </Engine>
    );
  }
}

export default SceneViewer;
