import { Color3, Color4, Mesh, MeshBuilder, Scene, Vector3, StandardMaterial, Material } from "@babylonjs/core";
import { Metamer } from "../Metamer";

interface Dictionary<T> {
    [Key: string]: T;
}

export class PlantNode {
    private metamer: Metamer;

    private debug: Dictionary<Mesh> = {};
    private scene: Scene;
    private debugMaterial: Material;
    constructor(metamer: Metamer, basePos: Vector3, scene: Scene) {
        this.metamer = metamer;
        this.scene = scene;
        this._createDebugMeshes();
        this.debugMaterial = new StandardMaterial("debug", this.scene);
        this.debugMaterial.wireframe = true;
    }

    private _createDebugMeshes() {
        const base = MeshBuilder.CreateBox('base', { size: this.metamer.radius }, this.scene);
        const basePos = this.metamer.getBaseEndpoint();
        base.position = basePos.position.clone();
        base.material = new StandardMaterial("debug", this.scene);
        base.material.wireframe = true;
        this.debug["base"] = base;

        const capsuleLength = this.metamer.length;
        const internode = MeshBuilder.CreateCapsule("internode",
            {
                radius: this.metamer.radius,
                height: capsuleLength,
                subdivisions: 12,
                capSubdivisions: 1,
                topCapSubdivisions: 6,
                tessellation: 8,
            }, this.scene)
        internode.material = new StandardMaterial("debug", this.scene);
        internode.material.wireframe = true;
        internode.position = basePos.position.clone();
        internode.position.y += this.metamer.length * 0.5;
        this.debug['internode'] = internode;

        const lines = [
            [Vector3.Zero(), basePos.frame.heading.scale(this.metamer.length)],
            [Vector3.Zero(), basePos.frame.left.scale(this.metamer.length)],
            [Vector3.Zero(), basePos.frame.up.scale(this.metamer.length)],
        ]
        const colours = [
            [new Color4(0, 0, 1, 1), new Color4(0, 0, 1, 1)],
            [new Color4(1, 0, 0, 1), new Color4(1, 0, 0, 1)],
            [new Color4(0, 1, 0, 1), new Color4(0, 1, 0, 1)],
        ]
        const axis = MeshBuilder.CreateLineSystem("heading", { lines: lines, colors: colours }, this.scene);
        this.debug["frame"] = axis;
    }
}