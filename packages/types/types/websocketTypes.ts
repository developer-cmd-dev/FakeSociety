interface WebSocketMessage<T=any> {
    type: MessageStates;
    payload:T;
}

export type MessageStates = "CONNECTION" | "MESSAGE" | "ERROR"|"SPAWNNER" | "AUTH"|"CONFIGURATION";
type ConfigurationData   = {
    websocketConnectionUrl:string;
    usersCount:number;
    typeSchema?:object|any;
    userId:string;
}

export { type WebSocketMessage,type ConfigurationData };