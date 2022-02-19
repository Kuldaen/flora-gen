import { Nullable, Scene } from "@babylonjs/core";
import { Plant } from "./plants/Plant";
import { Metamer } from "./plants/Metamer";
import { PlantNode } from "./plants/geometry/PlantNode";

export function buildPlantMesh({
  plant,
  scene,
}: {
  plant: Plant;
  scene: Scene;
}) {
  let current: Nullable<Metamer> = plant.root;
  const nodes = [];
  while (current) {
    nodes.push(new PlantNode(current, scene));
    current = current.successor;
  }
  console.log(nodes);
  return nodes;
}
