interface WebSocketMessage<T=any> {
    type: MessageStates;
    payload:T;
}

export type MessageStates = "CONNECTION" | "MESSAGE" | "ERROR"|"SPAWNER_AUTH" |"SPAWNER_AUTH_SUCCESS" | "AUTH"|"CONFIGURATION";
type ConfigurationData   = {
    websocketConnectionUrl:string;
    usersCount:number;
    typeSchema?:object|any;
    userId:string;
    payload?:object|any;
}

export { type WebSocketMessage,type ConfigurationData };