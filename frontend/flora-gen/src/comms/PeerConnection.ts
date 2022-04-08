import { io, Socket } from "socket.io-client";

interface ClientToServerEvents {
  hello: () => void;
  growl: (x: string) => void;
}

interface IDrawTextureCallback {
  (texture: Buffer): void;
}

interface ServerToClientEvents {
  noArg: () => void;
  drawTexture: IDrawTextureCallback;
}

interface IFloraServerConnection {
  server_url?: string;
  drawTexture?: IDrawTextureCallback;
}

export class PeerConnection {
  public onDrawTexture: IDrawTextureCallback;

  constructor({
    server_url = "http://localhost:8080",
    drawTexture = (texture: Buffer) => {},
  }: IFloraServerConnection) {
    this.onDrawTexture = drawTexture;
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      server_url,
      { parser: require("socket.io-msgpack-parser") }
    ).connect();
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("noArg", () => {
      console.log("noArg");
      socket.emit("growl", "bye");
    });
    socket.on("drawTexture", (texture: Buffer)=>{this.onDrawTexture(texture)})
    socket.emit("hello");
  }
}
