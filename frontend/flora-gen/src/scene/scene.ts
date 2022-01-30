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
  EventState
} from "@babylonjs/core";

function createScene(scene: Scene) {

  var ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene)
  const groundMat = new StandardMaterial("groundMat", scene);
  groundMat.diffuseColor = new Color3(0, 1, 0);
  ground.material = groundMat;

  new HemisphericLight("light", Vector3.Up(), scene);
}


function handlePointer(pointerInfo: PointerInfo, state: EventState) {
  switch (pointerInfo.type) {
    case PointerEventTypes.POINTERDOWN:
      console.log("POINTER DOWN");
      break;
    case PointerEventTypes.POINTERUP:
      console.log("POINTER UP");
      break;
    case PointerEventTypes.POINTERMOVE:
      console.log("POINTER MOVE");
      break;
    case PointerEventTypes.POINTERWHEEL:
      console.log("POINTER WHEEL");
      break;
    case PointerEventTypes.POINTERPICK:
      console.log("POINTER PICK");
      break;
    case PointerEventTypes.POINTERTAP:
      console.log("POINTER TAP");
      break;
    case PointerEventTypes.POINTERDOUBLETAP:
      console.log("POINTER DOUBLE-TAP");
      break;
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

  scene.onPointerObservable.add(handlePointer);

  scene.getEngine().runRenderLoop(() => {
    if (scene) {
      scene.render();
    }
  });
}