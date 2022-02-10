import { Nullable } from "@babylonjs/core";

export class Leaf {
};

export class Flower {
};

export class Metamer {
    private length = 0.1;
    private anglePhi = 0.0;
    private angleTheta = 0.0;
    private radius = 0.01;

    private leaf: Nullable<Leaf> = null;
    private flower: Nullable<Flower> = null;

    public successor: Nullable<Metamer> = null;
    public children: Array<Metamer> = [];

    public getRadius(): number {
        return this.radius;
    }

    public getLength(): number {
        return this.length;
    }

    public getAngleTheta() {
        return this.angleTheta;
    }
    public getAnglePhi() {
        return this.anglePhi;
    }
};

export class Plant {
    public root: Metamer = new Metamer();
}

export function createPlant(): Plant {
    const plant = new Plant();
    plant.root.successor = new Metamer();
    return plant;
}
