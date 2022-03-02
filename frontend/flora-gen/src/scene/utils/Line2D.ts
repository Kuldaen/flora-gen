import {
  Mesh,
  Scene,
  Vector3,
  VertexBuffer,
  VertexData,
} from "@babylonjs/core";

export function Line2D(
  name: string,
  path: Array<Vector3>,
  width: number,
  scene: Scene
): Mesh {
  var { positions, indices} = calculateVertsForLine2D(path, width);

  var customMesh = new Mesh(name, scene);
  var vertexData = new VertexData();

  vertexData.positions = positions;
  vertexData.indices = indices;

  vertexData.applyToMesh(customMesh, true);

  return customMesh;
}

export function UpdateLine2D(mesh: Mesh, path: Array<Vector3>, width: number) {
  var nbPoints = path.length;
  var nbVerts = mesh.getTotalVertices();
  if(nbVerts !== nbPoints*2){
    console.log("Error: New line has different number of points");
    return;
  }  

  
  var { positions, indices} = calculateVertsForLine2D(path, width);
  mesh.updateVerticesData(VertexBuffer.PositionKind, positions, true);
  mesh.setIndices(indices);
}

function calculateVertsForLine2D(path: Vector3[], width: number): { positions: number[]; indices: number[]; } {
  var outerData = [];
  var innerData = [];
  var angle = 0;

  var nbPoints = path.length;
  var line = Vector3.Zero();
  var nextLine = Vector3.Zero();
  path[1].subtractToRef(path[0], line);

  let lineNormal = new Vector3(line.y, -1 * line.x, 0).normalize();
  line.normalize();
  innerData[0] = path[0].subtract(lineNormal.scale(width));
  outerData[0] = path[0].add(lineNormal.scale(width));

  for (let p = 0; p < nbPoints - 2; p++) {
    path[p + 2].subtractToRef(path[p + 1], nextLine);
    angle =
      Math.PI -
      Math.acos(
        Vector3.Dot(line, nextLine) / (line.length() * nextLine.length())
      );
    let direction = Vector3.Cross(line, nextLine).normalize().z;
    lineNormal = new Vector3(line.y, -1 * line.x, 0).normalize();
    line.normalize();
    innerData[p + 1] = path[p + 1]
      .subtract(lineNormal.scale(width))
      .subtract(line.scale((direction * width) / Math.tan(angle / 2)));
    outerData[p + 1] = path[p + 1]
      .add(lineNormal.scale(width))
      .add(line.scale((direction * width) / Math.tan(angle / 2)));
    line = nextLine.clone();
  }
  if (nbPoints > 2) {
    path[nbPoints - 1].subtractToRef(path[nbPoints - 2], line);
    lineNormal = new Vector3(line.y, -1 * line.x, 0).normalize();
    line.normalize();
    innerData[nbPoints - 1] = path[nbPoints - 1].subtract(
      lineNormal.scale(width)
    );
    outerData[nbPoints - 1] = path[nbPoints - 1].add(lineNormal.scale(width));
  } else {
    innerData[1] = path[1].subtract(lineNormal.scale(width));
    outerData[1] = path[1].add(lineNormal.scale(width));
  }
  var positions = [];
  var indices = [];

  for (let p = 0; p < nbPoints; p++) {
    positions.push(innerData[p].x, innerData[p].y, innerData[p].z);
  }

  for (let p = 0; p < nbPoints; p++) {
    positions.push(outerData[p].x, outerData[p].y, outerData[p].z);
  }

  for (let i = 0; i < nbPoints - 1; i++) {
    indices.push(i, nbPoints + i + 1, i + 1);
    indices.push(i, nbPoints + i, nbPoints + i + 1);
  }
  return { positions, indices };
}
