import { MeshBuilder, Scene, Vector3 } from "@babylonjs/core";
import Path, { smoothPath } from "./geometry/path";
import { Plant } from "./plants/Plant";

function buildTestTubeMesh({
  plant,
  scene,
}: {
  plant: Plant;
  scene: Scene;
}): void {
  const path = new Path(
    new Vector3(0, 0, 0),
    new Vector3(0, 2, 0),
    new Vector3(0, 3, -6),
    new Vector3(3, 5, 5),
    new Vector3(-4, 8 - 0.5)
  );
  const smoothed = smoothPath({ path });
  MeshBuilder.CreateTube("tube", { path: smoothed, radius: 0.25 }, scene);
}
