import {WebSocketServer} from 'ws';


const port = process.env.PORT as string || 8080 ;

const wss= new WebSocketServer({ port: 8080 });


wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log(`WebSocket server is running on ws://localhost:${port}`);