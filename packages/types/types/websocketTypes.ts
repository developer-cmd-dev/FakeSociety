interface WebSocketMessage<T=any> {
    type: "CONNECTION" | "MESSAGE" | "ERROR"|"SPAWNNER" | "AUTH"|"CONFIGURATION";
    payload:T;
}

type CofingurationData = {
    websocketConnectionUrl:string;
    usersCount:number;
    typeSchema?:object|any;
}

export { type WebSocketMessage, type CofingurationData };