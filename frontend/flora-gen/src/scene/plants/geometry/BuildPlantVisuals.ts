import { Nullable, Scene } from "@babylonjs/core";
import { Plant } from "../structure/Plant";
import { Metamer } from "../structure/Metamer";
import { MetamerMesh } from "./MetamerMesh";

export function BuildPlantVisuals(plant: Plant, scene: Scene): MetamerMesh[] {
  let current: Nullable<Metamer> = plant.root;
  const nodes = [];
  while (current) {
    nodes.push(new MetamerMesh(current, scene));
    current = current.successor;
  }
  console.log(nodes);
  return nodes;
}
