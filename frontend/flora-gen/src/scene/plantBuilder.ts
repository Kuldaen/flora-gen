import { Mesh, MeshBuilder, Scene, StandardMaterial, Vector3 } from "@babylonjs/core";
import Path, { smoothPath } from "./geometry/path";
import { Metamer, Plant } from "./plants/plants";

export function buildPlantMesh({ plant, scene }: { plant: Plant; scene: Scene; }): Mesh[] {
    return buildMetamerMesh({
        node: plant.root,
        basePosition: Vector3.Zero(),
        headingVector: Vector3.Up(),
        scene: scene,
    });
}

export function buildMetamerMesh({ node, basePosition, headingVector, scene }:
    {
        node: Metamer;
        basePosition: Vector3,
        headingVector: Vector3,
        scene: Scene;
    }): Mesh[] {
    const meshes: Mesh[] = [];
    const base = MeshBuilder.CreateBox('base', { size: node.getRadius() }, scene);
    base.position = basePosition;
    meshes.push(base);

    const length = node.getLength();
    const radius = node.getRadius();

    const capsuleLength = length;
    const internode = MeshBuilder.CreateCapsule("internode",
        {
            radius: radius,
            height: capsuleLength,
            subdivisions: 12,
            capSubdivisions: 1,
            topCapSubdivisions: 12,
            tessellation: 8,
        }, scene)
    internode.position = basePosition.clone();
    internode.position.y += length * 0.5;

    if (node.successor) {
        buildMetamerMesh({
            node: node.successor,
            basePosition: basePosition.add(headingVector.scale(length)),
            headingVector: Vector3.Up(),
            scene: scene,
        });
    }

    return meshes;
}

function buildTestTubeMesh({ plant, scene }: { plant: Plant; scene: Scene; }): void {
    const path = new Path(new Vector3(0, 0, 0), new Vector3(0, 2, 0), new Vector3(0, 3, -6), new Vector3(3, 5, 5), new Vector3(-4, 8. - 0.5),
    );
    const smoothed = smoothPath({ path });
    MeshBuilder.CreateTube("tube", { path: smoothed, radius: 0.25 }, scene);
}