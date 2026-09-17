interface WebSocketMessage<T=any> {
    type: "CONNECTION" | "MESSAGE" | "ERROR"|"SPAWNNER" | "AUTH"|"CONFIGURATION";
    payload:T;
}

type ConfigurationData   = {
    websocketConnectionUrl:string;
    usersCount:number;
    typeSchema?:object|any;
    userId:string;
}

export { type WebSocketMessage,type ConfigurationData  };