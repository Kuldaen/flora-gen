import { Nullable, Vector3 } from "@babylonjs/core";
import { Flower } from "./Flower";
import { HeadingFrame } from "./HeadingFrame";
import { Leaf } from "./Leaf";

export interface MetamerEndpointInfo {
    position: Vector3;
    frame: HeadingFrame;
}

export class Metamer {
    public length = 0.1;
    public anglePhi = 0.0;
    public angleTheta = 0.0;
    public radius = 0.01;

    public leaf: Nullable<Leaf> = null;
    public flower: Nullable<Flower> = null;

    public predecessor: Nullable<Metamer> = null;
    public successor: Nullable<Metamer> = null;

    public parent: Nullable<Metamer> = null;
    public children: Array<Metamer> = [];

    public setSucessor(successor: Metamer) {
        this.successor = successor;
        successor.parent = this;
    }

    private basePosition: Vector3 = Vector3.Zero();
    private frame: HeadingFrame = new HeadingFrame();

    public getBaseEndpoint(): MetamerEndpointInfo {
        return { position: this.basePosition, frame: this.frame };
    }

    public getTipEndpoint(): MetamerEndpointInfo {
        return {
            position:
                this.basePosition.add(this.frame.heading.scale(this.length)),
            frame: this.frame,
        };
    }

    public propagateChanges() {
        if (this.parent) {
            const baseEndpoint = this.parent?.getTipEndpoint();
            this.basePosition = baseEndpoint.position;
            this.frame = baseEndpoint.frame.applyRotation(this.angleTheta, this.anglePhi);
        }
        if (this.successor) {
            this.successor.propagateChanges();
        }
    }

}
