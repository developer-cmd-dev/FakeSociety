import { WebSocketServer } from 'ws';

import { type WebSocketMessage, type ConfigurationData, ConnectionPayloadSchema, SpawnerConnectionPayloadSchema, ConfigurationDataSchema } from '@repo/types/WebsocketTypes';
import { Users } from './src/Users';
import { Spawner } from './src/Spawner';
const port = process.env.PORT as string || 8080;

const wss = new WebSocketServer({ port: 8080 });
const activeConnections = new Map<string, Users>();
const activeSpawnersConnections = new Map<string, Spawner>();
wss.on('connection', (ws: WebSocket) => {

  ws.onmessage = (event) => {
    const parsedMessage: WebSocketMessage = JSON.parse(event.data.toString());

    if (parsedMessage.type === 'CONNECTION') {
      const connectionData = ConnectionPayloadSchema.safeParse(parsedMessage.payload);
      if (connectionData.error) {
        ws.send(JSON.stringify({ type: "ERROR", payload: { message: "Invalid connection data" } }));
        return;
      }

      if (activeConnections.has(connectionData.data.id)) {
        ws.send(JSON.stringify({ type: "ERROR", payload: { message: "User already connected" } }));
        return;
      }
      const newUser = new Users(connectionData.data.id, connectionData.data.username, ws);
      activeConnections.set(connectionData.data.id, newUser);
    } else if (parsedMessage.type === 'SPAWNNER') {

      const payload = SpawnerConnectionPayloadSchema.safeParse(parsedMessage.payload);

      if (payload.error) {
        ws.send(JSON.stringify({ type: "ERROR", payload: { message: "Invalid spawner data " } }));
        return;
      }

      if (!payload.data.authCode.trim()) {
        ws.send(JSON.stringify({ type: "ERROR", payload: { message: "Missing auth code" } }));
        return;
      }

      // validate the auth code from http server

      const user = { name: "John Doe", id: "12345" }; // Replace with actual user data from the HTTP server

      if (!user) {
        ws.send(JSON.stringify({ type: "ERROR", payload: { message: "Invalid auth code" } }));
        return;
      }

      const newSpawner = new Spawner(user.id, ws);
      activeSpawnersConnections.set(user.id, newSpawner);

      ws.send(JSON.stringify({ type: "SPAWNNER", payload: { message: "Spawner connected successfully" } }));
    } else if (parsedMessage.type === 'CONFIGURATION') {

      const {data, error} = ConfigurationDataSchema.safeParse(parsedMessage.payload) ;
     
      if (error) {
        ws.send(JSON.stringify({ type: "ERROR", payload: { message: "Invalid configuration data" } }));
        return;
      }

      const spawner = activeSpawnersConnections.get(data.userId);
      if (!spawner) {
        ws.send(JSON.stringify({ type: "ERROR", payload: { message: "Spawner not found" } }));
        return;
      }
      spawner.setConfigurationData(data);

      



    }



  };

  ws.onclose = () => {
    console.log('Client disconnected');
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };



});

console.log(`WebSocket server is running on ws://localhost:${port}`);