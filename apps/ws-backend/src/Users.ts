export class Users{
    id: string;
    username: string;
    socket:WebSocket;

    constructor(id: string, username: string, socket: WebSocket) {
        this.id = id;
        this.username = username;
        this.socket = socket;
    }

}