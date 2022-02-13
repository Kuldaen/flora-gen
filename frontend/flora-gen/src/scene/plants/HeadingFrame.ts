import { MeshBuilder, Scene, Vector3 } from "@babylonjs/core";
import { Lines } from "react-babylonjs";

export class HeadingFrame {
    // frame of meta growth left-handed X=heading Y=up
    public heading: Vector3;
    public up: Vector3;
    public left: Vector3;

    constructor(
        H: Vector3 = Vector3.Up(),
        L: Vector3 = Vector3.Left(),
        U: Vector3 = Vector3.Forward()
    ) {
        this.heading = H;
        this.left = L;
        this.up = U;
    }
}
