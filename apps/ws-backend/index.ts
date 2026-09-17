import { WebSocketServer } from 'ws';

import { type WebSocketMessage, type ConfigurationData, ConnectionPayloadSchema, SpawnerConnectionPayloadSchema, ConfigurationDataSchema, type MessageStates } from '@repo/types/WebsocketTypes';
import { Users } from './src/Users';
import { Spawner } from './src/Spawner';
import { generateResponse } from './src/agent/ollama';
const port = process.env.PORT as string || 8080;

const wss = new WebSocketServer({ port: 8080 });
const activeConnections = new Map<string, Users>();
const activeSpawnersConnections = new Map<string, Spawner>();
wss.on('connection', (ws: WebSocket) => {

  ws.onmessage = async (event) => {
    const parsedMessage: WebSocketMessage = JSON.parse(event.data.toString());

    if (parsedMessage.type === 'CONNECTION') {
      const connectionData = ConnectionPayloadSchema.safeParse(parsedMessage.payload);
      if (connectionData.error) {
        sendMessage("ERROR", "Invalid connection data", ws);
        return;
      }

      if (activeConnections.has(connectionData.data.id)) {
        sendMessage("ERROR", "User already connected", ws);
        return;
      }
      const newUser = new Users(connectionData.data.id, connectionData.data.username, ws);
      activeConnections.set(connectionData.data.id, newUser);


    } else if (parsedMessage.type === 'SPAWNER_AUTH') {

      const payload = SpawnerConnectionPayloadSchema.safeParse(parsedMessage.payload);
      if (payload.error) {
        sendMessage("ERROR", "Invalid spawner data", ws);
        return;
      }

      if (!payload.data.authToken.trim()) {
        sendMessage("ERROR", "Missing auth code", ws);
        return;
      }

      // validate the auth code from http server

      const user = { name: "John Doe", id: "12345" }; // Replace with actual user data from the HTTP server

      if (!user) {
        sendMessage("ERROR", "Invalid auth code", ws);
        return;
      }

      const newSpawner = new Spawner(user.id, ws);
      activeSpawnersConnections.set(user.id, newSpawner);

      sendMessage("SPAWNER_AUTH_SUCCESS", "Spawner connected successfully", ws);
    } else if (parsedMessage.type === 'CONFIGURATION') {

      const {data, error} = ConfigurationDataSchema.safeParse(parsedMessage.payload) ;
      console.log(data)
      if (error) {
        sendMessage("ERROR", "Invalid configuration data", ws);
        return;
      }

      const spawner = activeSpawnersConnections.get(data.userId);
      if (!spawner) {
        sendMessage("ERROR", "Spawner not found", ws);
        return;
      }
      spawner.setConfigurationData(data);

      const generatedUser = JSON.parse(await generateResponse(JSON.stringify(data)));
      if(generatedUser.action === "users_generated"){
        data.virtualUsersPayload = generatedUser.users;
        sendMessage("CONFIGURATION", data, spawner.socket);
      }
    }



  };

  ws.onclose = (data) => {
    console.log(data)
    console.log('Client disconnected');
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };



});


function sendMessage(type:MessageStates,message: any,ws:WebSocket) {
  const messageString = JSON.stringify({ type, payload: message });
  ws.send(messageString);
}


console.log(`WebSocket server is running on ws://localhost:${port}`);