import { EventState } from "@babylonjs/core";
import {
  AdvancedDynamicTexture,
  Button,
  Vector2WithInfo,
} from "@babylonjs/gui";
import { FloraApp } from "../FloraApp";

interface IObjservableCallback {
  (eventData: Vector2WithInfo, eventState: EventState): void;
}

interface IUIPos {
  x: number;
  y: number;
}
interface IButtonOptions {
  name: string;
  text: string;
  pos: IUIPos;
  width_px?: number;
  height_px?: number;
  onPointerUp: IObjservableCallback;
}

const IDEAL_CANVAS_HEIGHT = 600;
const IDEAL_CANVAS_WIDTH = 1000;
const BUTTON_HEIGHT = 30;
const BUTTON_WIDTH = 150;

function createButton(options : IButtonOptions): Button {
  const width = options.width_px ? options.width_px : BUTTON_WIDTH;
  const height = options.height_px ? options.height_px : BUTTON_HEIGHT;
  const button = Button.CreateSimpleButton(options.name, options.text);
  button.fontSize = "20px";
  button.width = `${width}px`;
  button.height = `${height}px`;
  button.left = `${options.pos.x - IDEAL_CANVAS_WIDTH / 2 + width / 2}px`;
  button.top = `${options.pos.y - IDEAL_CANVAS_HEIGHT / 2 + height / 2}px`;
  button.cornerRadius = 20;
  button.background = "green";
  button.color = "white";
  button.onPointerUpObservable.add(options.onPointerUp);
  return button;
}

export function CreateUI(app: FloraApp) {
  const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(
    "UI",
    true,
    app.scene
  );
  advancedTexture.idealWidth = IDEAL_CANVAS_WIDTH;
  advancedTexture.addControl(createButton({
    name: "up",
    text: "↑",
    pos: { x: 10, y: 60 },
    width_px: 50,
    onPointerUp: function () {
      app.setCameraTargetUp();
    },
  }));

  advancedTexture.addControl(
  createButton({
    name: "down",
    text: "↓",
    pos: { x: 10, y: 100 },
    width_px: 50,
    onPointerUp: function () {
      app.setCameraTargetDown();
    },
  }));

}
