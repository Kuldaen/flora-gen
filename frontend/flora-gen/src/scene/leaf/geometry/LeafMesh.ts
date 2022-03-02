import {
  Mesh,
  MeshBuilder,
  Scene,
  Vector3,
  VertexBuffer,
} from "@babylonjs/core";
import { Line2D, UpdateLine2D} from "../../utils/Line2D";
import { Leaf, Vein } from "../structure/Leaf";

interface Dictionary<T> {
  [Key: string]: T;
}

class VeinLine {
  private _vein: Vein;
  private _line: Mesh;
  constructor(vein: Vein, scene: Scene) {
    this._vein = vein;
    this._line =  Line2D("vein", [this._vein.basePosition, this._vein.tipPosition], 0.0025, scene)
  }
}

export class LeafMesh {
  private leaf: Leaf;

  private debug: Dictionary<Mesh> = {};
  private scene: Scene;

  private veins: Dictionary<VeinLine> = {}

  constructor(leaf: Leaf, scene: Scene) {
    this.leaf = leaf;
    this.scene = scene;
    this._createDebugMeshes();
  }

  private _createDebugMeshes() {
    this.veins[this.leaf.veinRoot.name] = new VeinLine(this.leaf.veinRoot, this.scene);
  }
}
