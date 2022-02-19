import { float, Matrix, Quaternion, Vector3 } from "@babylonjs/core";

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

  public getTransform() {
    const matrix = new Matrix();
    Matrix.FromXYZAxesToRef(this.up, this.heading, this.left, matrix);
    return matrix;
  }

  public applyRotation(angleTheta: float, anglePhi: float) {
    const rotation = Quaternion.RotationAxis(this.up, angleTheta).multiply(
      Quaternion.RotationAxis(this.heading, anglePhi)
    );

    const H = this.heading.rotateByQuaternionToRef(rotation, new Vector3());
    const L = this.left.rotateByQuaternionToRef(rotation, new Vector3());
    const U = this.up.rotateByQuaternionToRef(rotation, new Vector3());
    
    return new HeadingFrame(H, L, U);
  }
}
