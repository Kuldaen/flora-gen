import { Component } from "react";
import { Scene, Engine, SceneEventArgs } from "react-babylonjs";
import { createFloraApp } from "../scene/FloraApp";

class SceneViewer extends Component {
  onSceneMount(e: SceneEventArgs): void {
    createFloraApp(e);
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
