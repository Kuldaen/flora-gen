import { float } from "@babylonjs/core";
import { Metamer } from "./Metamer";

export class Plant {
  public root: Metamer = new Metamer();
}

function createMetamer(
  length: float,
  angleTheta: float = 0,
  anglePhi: float = 0
): Metamer {
  const m = new Metamer();
  m.length = length;
  m.angleTheta = angleTheta;
  m.anglePhi = anglePhi;
  return m;
}

export function createPlant(): Plant {
  const plant = new Plant();
  const segment2 = createMetamer(0.075, Math.PI / 8, Math.PI / 2);
  plant.root.setSucessor(segment2);

  const segment3 = createMetamer(0.05, Math.PI / 8);
  segment2.setSucessor(segment3);

  plant.root.propagateChanges();
  return plant;
}
