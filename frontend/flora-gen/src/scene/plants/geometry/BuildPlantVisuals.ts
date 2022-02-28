import { Nullable, Scene } from "@babylonjs/core";
import { Plant } from "../structure/Plant";
import { Metamer } from "../structure/Metamer";
import { PlantNode } from "./PlantNode";

export function BuildPlantVisuals(plant: Plant, scene: Scene): PlantNode[] {
  let current: Nullable<Metamer> = plant.root;
  const nodes = [];
  while (current) {
    nodes.push(new PlantNode(current, scene));
    current = current.successor;
  }
  console.log(nodes);
  return nodes;
}
