import { Nullable, Vector3 } from "@babylonjs/core";
import { Flower } from "./Flower";
import { HeadingFrame } from "./HeadingFrame";
import { Leaf } from "./Leaf";

export interface MetamerEndpointInfo {
  position: Vector3;
  frame: HeadingFrame;
}

export class Metamer {
  private _length = 0.1;
  get length() {
    return this._length;
  }
  set length(length: number) {
    this._length = length;
  }

  private _anglePhi = 0.0;
  get anglePhi() {
    return this._anglePhi;
  }
  set anglePhi(phi: number) {
    this._anglePhi = phi;
  }

  private _angleTheta = 0.0;
  get angleTheta() {
    return this._angleTheta;
  }
  set angleTheta(theta: number) {
    this._angleTheta = theta;
  }

  private _radius = 0.005;
  get radius() {
    return this._radius;
  }
  set radius(radius: number) {
    this._radius = radius;
  }

  public leaf: Nullable<Leaf> = null;
  public flower: Nullable<Flower> = null;

  public parent: Nullable<Metamer> = null;

  public children: Array<Metamer> = [];

  private _is_successor = false;
  get is_successor() {
    return this._is_successor;
  }

  private _successor: Nullable<Metamer> = null;
  get successor() {
    return this._successor;
  }
  public setSucessor(successor: Metamer) {
    this._successor = successor;
    this._is_successor = true;
    successor.parent = this;
  }

  private basePosition: Vector3 = Vector3.Zero();
  private frame: HeadingFrame = new HeadingFrame();

  public getBaseEndpoint(): MetamerEndpointInfo {
    return { position: this.basePosition, frame: this.frame };
  }

  public getTipEndpoint(): MetamerEndpointInfo {
    return {
      position: this.basePosition.add(this.frame.heading.scale(this.length)),
      frame: this.frame,
    };
  }

  public propagateChanges() {
    if (this.parent) {
      const baseEndpoint = this.parent?.getTipEndpoint();
      this.basePosition = baseEndpoint.position;
      this.frame = baseEndpoint.frame.applyRotation(
        this.angleTheta,
        this.anglePhi
      );
    }
    if (this.successor) {
      this.successor.propagateChanges();
    }
  }
}
