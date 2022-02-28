import { Component } from "react";
import { Scene, Engine, SceneEventArgs } from "react-babylonjs";
import { createLeafApp} from "../scene/leaf/LeafApp";
// import { createFloraApp } from "../scene/plants/FloraApp";

class SceneViewer extends Component {
  onSceneMount(e: SceneEventArgs): void {
    // createFloraApp(e);
    createLeafApp(e);
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
