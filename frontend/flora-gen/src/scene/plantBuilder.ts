import { Mesh, MeshBuilder, Nullable, Scene, StandardMaterial, Vector3 } from "@babylonjs/core";
import Path, { smoothPath } from "./geometry/path";
import { Plant } from "./plants/Plant";
import { Metamer } from "./plants/Metamer";
import { PlantNode } from "./plants/geometry/PlantNode";

export function buildPlantMesh({ plant, scene }: { plant: Plant; scene: Scene; }) {
    let current: Nullable<Metamer> = plant.root;
    const nodes = [];
    while (current) {
        nodes.push(new PlantNode(current, scene));
        current = current.successor;
    }
    console.log(nodes)

}


function buildTestTubeMesh({ plant, scene }: { plant: Plant; scene: Scene; }): void {
    const path = new Path(new Vector3(0, 0, 0), new Vector3(0, 2, 0), new Vector3(0, 3, -6), new Vector3(3, 5, 5), new Vector3(-4, 8. - 0.5),
    );
    const smoothed = smoothPath({ path });
    MeshBuilder.CreateTube("tube", { path: smoothed, radius: 0.25 }, scene);
}