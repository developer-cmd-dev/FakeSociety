export class Spawner {
    userId:string;
    socket: WebSocket;
     constructor( userId: string, socket: WebSocket) {
        this.userId = userId;
        this.socket = socket;
    }

}