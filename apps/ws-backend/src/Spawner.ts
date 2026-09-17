import type { ConfigurationData } from "@repo/types/WebsocketTypes";

export class Spawner {
    userId:string;
    socket: WebSocket;
    configurationData: ConfigurationData | null = null;
     constructor( userId: string, socket: WebSocket) {
        this.userId = userId;
        this.socket = socket;
    }

    setConfigurationData(data: ConfigurationData) { 
        this.configurationData = data;
    }

}