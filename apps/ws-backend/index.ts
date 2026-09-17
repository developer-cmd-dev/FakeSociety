import { WebSocketServer } from 'ws';

import { type WebSocketMessage, type CofingurationData } from '@repo/types/WebsocketTypes';
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
      const connectionData = <{ id: string; username: string }>parsedMessage.payload;

      if (activeConnections.has(connectionData.id)) {
        ws.send(JSON.stringify({ type: "ERROR", payload: { message: "User already connected" } }));
        return;
      }
      const newUser = new Users(connectionData.id, connectionData.username, ws);
      activeConnections.set(connectionData.id, newUser);
      console.log(`User connected: ${connectionData.username} (ID: ${connectionData.id})`);

    } else if (parsedMessage.type === 'SPAWNNER') {

      const authCode = <{ authCode: string }>parsedMessage.payload;

      if (!authCode) {
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

      const configData = <CofingurationData>parsedMessage.payload;
      const userId = activeConnections.entries().forEach(([id, user]) => {
        if (ws == user.socket) {
          return id;
        }

        console.log("User ID:", userId);
      });






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