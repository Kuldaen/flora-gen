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

    public successor: Nullable<Metamer> = null;
    public children: Array<Metamer> = [];

    private basePosition: Vector3;
    private frame: HeadingFrame;

    constructor(baseEndpoint: MetamerEndpointInfo) {
        this.basePosition = baseEndpoint.position;
        this.frame = baseEndpoint.frame;
    }

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

}
