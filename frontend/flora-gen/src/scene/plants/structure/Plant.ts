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

  let x = 5;
  let seg = createMetamer(0.025, Math.PI/4);
  while(x>0){
    const newSeg = createMetamer(0.025, Math.PI/5, Math.PI/7);
    newSeg.setSucessor(seg);
    seg = newSeg;
    --x;
  }

  const segment3 = createMetamer(0.025, Math.PI / 8);
  segment3.setSucessor(seg);

  const segment2 = createMetamer(0.075, -Math.PI / 8, Math.PI / 2);
  segment2.setSucessor(segment3);
  plant.root.setSucessor(segment2);

  plant.root.propagateChanges();
  return plant;
}
