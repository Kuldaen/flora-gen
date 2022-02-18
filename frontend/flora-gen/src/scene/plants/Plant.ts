import { Metamer } from "./Metamer";

export class Plant {
    public root: Metamer = new Metamer();
}

export function createPlant(): Plant {
    const plant = new Plant();
    const segment2 = new Metamer();
    segment2.angleTheta = Math.PI / 8;
    segment2.anglePhi = Math.PI / 2;
    const segment3 = new Metamer();
    segment3.angleTheta = Math.PI / 8;
    segment3.anglePhi = Math.PI / 2;
    segment2.setSucessor(segment3)
    plant.root.setSucessor(segment2);
    plant.root.propagateChanges();
    return plant;
}
