import "pepjs";
import {
  Scene,
  Color3,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  UniversalCamera,
  PointerEventTypes,
  PointerInfo,
  EventState,
  Mesh
} from "@babylonjs/core";

function createScene(scene: Scene) {

  var ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene)
  const groundMat = new StandardMaterial("groundMat", scene);
  groundMat.diffuseColor = new Color3(0, 1, 0);
  ground.material = groundMat;

  new HemisphericLight("light", Vector3.Up(), scene);
}


function handlePointer(scene: Scene) {
  return (pointerInfo: PointerInfo, state: EventState) => {
    switch (pointerInfo.type) {
      case PointerEventTypes.POINTERDOWN:
        break;
      case PointerEventTypes.POINTERUP:
        break;
      case PointerEventTypes.POINTERMOVE:
        console.log(pointerInfo);
        if (pointerInfo.pickInfo?.ray) {

          var hitInfo = scene.pickWithRay(pointerInfo.pickInfo.ray);
          if (hitInfo?.hit && hitInfo?.pickedPoint) {
            var sphere: Mesh = MeshBuilder.CreateSphere("sphere", {diameter: 0.25}, scene);
            sphere.position = hitInfo.pickedPoint;
            sphere.isPickable = false;
          }
        }
        break;
      case PointerEventTypes.POINTERWHEEL:
        break;
      case PointerEventTypes.POINTERPICK:
        break;
      case PointerEventTypes.POINTERTAP:
        break;
      case PointerEventTypes.POINTERDOUBLETAP:
        break;
    }
  }
};

export function handleScene({ canvas, scene }: { canvas: HTMLCanvasElement; scene: Scene; }) {
  var camera = new UniversalCamera(
    "Camera",
    new Vector3(5, 5, 10),
    scene
  );
  camera.setTarget(Vector3.Zero())
  // camera.attachControl(canvas);

  createScene(scene);

  scene.onPointerObservable.add(handlePointer(scene));

  scene.getEngine().runRenderLoop(() => {
    if (scene) {
      scene.render();
    }
  });
}