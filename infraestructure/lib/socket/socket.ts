import { io, Socket } from "socket.io-client";
import config from "../../config/config";

class SocketClient {
  private static instance: SocketClient;
  private socket: Socket | null = null;
  private userId: string | null = null;

  private constructor() {}

  public static getInstance(): SocketClient {
    if (!SocketClient.instance) {
      SocketClient.instance = new SocketClient();
    }
    return SocketClient.instance;
  }
  public async connect(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log("Iniciando conexión Socket.IO");

      this.socket = io(config.host, {
        transports: ["websocket"],
        autoConnect: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      this.socket.on("connect", () => {
        console.log("Socket conectado, iniciando autenticación...");
        this.socket?.emit(
          "authenticate",
          token,
          (response: { success: boolean }) => {
            if (response.success) {
              console.log("Autenticación confirmada por callback");
            } else {
              reject(new Error("Autenticación fallida"));
            }
          }
        );
      });

      this.socket.on("authenticated", () => {
        console.log("Evento authenticated recibido");
        resolve();
      });

      this.socket.on("auth_error", (error) => {
        console.error("Error de autenticación:", error);
        reject(new Error(error.message));
      });

      this.socket.on("connect_error", (err) => {
        console.error("Error de conexión:", err);
        reject(err);
      });
    });
  }

  public onNotification(callback: (data: any) => void) {
    this.socket?.on("new_notification", callback);
  }

  public onGlobalNotification(callback: (data: any) => void) {
    this.socket?.on("global_notification", callback);
  }

  public disconnect() {
    this.socket?.disconnect();
    this.socket = null;
    this.userId = null;
  }

  public getSocket(): Socket {
    if (!this.socket) throw new Error("Socket no conectado");
    return this.socket;
  }
}

export const socketClient = SocketClient.getInstance();
