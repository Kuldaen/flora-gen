import { Vector3 } from "@babylonjs/core";

export default class Path extends Array<Vector3> {}

export type integer = number;

export function smoothPath({
  path,
  factor = 0.75,
  iterations = 5,
}: {
  path: Path;
  factor?: number;
  iterations?: integer;
}): Path {
  while (iterations >= 0) {
    path = subdivide({ path, factor });
    iterations--;
  }
  return path;
}

function subdivide({ path, factor }: { path: Path; factor: number }): Path {
  const output = new Path();
  if (path.length > 0) {
    output.push(path[0]);
  }
  for (const i in path) {
    const current = path[i];
    const next = path[Number(i) + 1];
    if (!next) break;
    const Q = current.scale(factor).add(next.scale(1 - factor));
    const R = current.scale(1 - factor).add(next.scale(factor));
    output.push(Q);
    output.push(R);
  }
  if (path.length > 1) output.push(path[path.length - 1]);
  return output;
}
