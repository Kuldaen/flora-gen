import {
  Color3,
  Color4,
  Mesh,
  MeshBuilder,
  Scene,
  Vector3,
  StandardMaterial,
  Quaternion,
} from "@babylonjs/core";
import { Metamer } from "../structure/Metamer";

interface Dictionary<T> {
  [Key: string]: T;
}

export class MetamerMesh {
  private metamer: Metamer;

  private debug: Dictionary<Mesh> = {};
  private scene: Scene;

  constructor(metamer: Metamer, scene: Scene) {
    this.metamer = metamer;
    this.scene = scene;
    this._createDebugMeshes();
  }

  get position(){
    return this.metamer.getBaseEndpoint().position;
  }
  
  private _createDebugMaterial() {
    const material = new StandardMaterial("debug", this.scene);
    material.wireframe = true;
    material.ambientColor = new Color3(0.5, 0.7, 0.5);
    return material;
  }

  private _createDebugMeshes() {
    const base = MeshBuilder.CreateBox(
      "base",
      { size: this.metamer.radius },
      this.scene
    );
    const basePos = this.metamer.getBaseEndpoint();
    base.position = basePos.position;
    base.material = this._createDebugMaterial();
    this.debug["base"] = base;

    const capsuleLength = this.metamer.length;
    const internode = MeshBuilder.CreateCapsule(
      "internode",
      {
        radius: this.metamer.radius,
        height: capsuleLength,
        subdivisions: 4,
        capSubdivisions: 1,
        topCapSubdivisions: 4,
        tessellation: 8,
      },
      this.scene
    );

    const transform = basePos.frame.getTransform();
    transform.setTranslation(basePos.position);
    internode.position = Vector3.TransformCoordinates(
      new Vector3(0, capsuleLength / 2, 0),
      transform
    );
    internode.rotationQuaternion = Quaternion.FromRotationMatrix(
      transform.getRotationMatrix()
    );
    internode.material = this._createDebugMaterial();
    this.debug["internode"] = internode;

    const axisLength = this.metamer.radius * 2;
    const lines = [
      [Vector3.Zero(), basePos.frame.heading.scale(axisLength)],
      [Vector3.Zero(), basePos.frame.left.scale(axisLength)],
      [Vector3.Zero(), basePos.frame.up.scale(axisLength)],
    ];
    const colours = [
      [new Color4(0, 0, 1, 1), new Color4(0, 0, 1, 1)],
      [new Color4(1, 0, 0, 1), new Color4(1, 0, 0, 1)],
      [new Color4(0, 1, 0, 1), new Color4(0, 1, 0, 1)],
    ];
    const axis = MeshBuilder.CreateLineSystem(
      "heading",
      { lines: lines, colors: colours },
      this.scene
    );
    axis.position = basePos.position;
    this.debug["frame"] = axis;
  }
}
