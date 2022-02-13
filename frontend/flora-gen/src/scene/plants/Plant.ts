import { Vector3 } from "@babylonjs/core";
import { HeadingFrame } from "./HeadingFrame";
import { Metamer } from "./Metamer";

export class Plant {
    public root: Metamer = new Metamer({position: Vector3.Zero(), frame: new HeadingFrame() });
}

export function createPlant(): Plant {
    const plant = new Plant();
    const segment2 = new Metamer(plant.root.getTipEndpoint());
    segment2.angleTheta = Math.PI / 4;
    plant.root.successor = segment2;
    return plant;
}
