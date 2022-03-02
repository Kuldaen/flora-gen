import { Vector3 } from "@babylonjs/core";

export class Vein {
  private _successors: Array<Vein> = [];
  private _position: Vector3;
  private _angleRho: number = 0;
  private _length: number = 0.1;

  constructor(pos: Vector3) {
    this._position = pos;
  }

  get name() : string{
      return 'vein';
  }

  get basePosition() {
    return this._position;
  }

  get tipPosition() {
    return this._position.add(
      new Vector3(
        this._length * Math.sin(this._angleRho),
        this._length * Math.cos(this._angleRho),
      )
    );
  }
}

export class Leaf {
  private _margin: Array<Vector3> = [];
  private _veins: Vein = new Vein(Vector3.Zero());

  get veinRoot() {
      return this._veins;
  }
}
