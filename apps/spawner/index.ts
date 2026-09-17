import { WebSocket } from 'ws';
import fs from 'fs';
import { ConfigurationDataSchema, type WebSocketMessage } from '@repo/types/WebsocketTypes';
import { createSpawner } from './spawner';

async function spawnServer() {

    console.log('Welcome to the FackeSociety Handler....');
    console.log("Paste Authentication Token Here: ");

    try {

        const buffer = Buffer.alloc(1024);

        const bufferData = fs.readSync(0, buffer);
        const dataInString = buffer.toString('utf-8', 0, bufferData);

        if (!dataInString) {
            console.log("No Token Provided, Exiting....");
            process.exit(1);
        }

        const token = dataInString.trim();

        const ws = new WebSocket('ws://localhost:8080');

        ws.on('open', function open() {
            console.log('Connected to the server, sending authentication token...');
            ws.send(JSON.stringify({ type: "SPAWNER_AUTH", payload:{authToken:token}}));
        });

      
            ws.on('message', function incoming(data) {
                const message: WebSocketMessage = JSON.parse(data.toString());
                if (message.type === 'SPAWNER_AUTH_SUCCESS') {
                    console.log('Authentication successful!');
                } else if (message.type === "CONFIGURATION") {
                    const configData = ConfigurationDataSchema.safeParse(message.payload);
                    if (configData.error) {
                        ws.send(JSON.stringify({ type: "ERROR", payload: "Invalid configuration data" }));
                        console.error('Invalid configuration data received:', configData.error);
                        process.exit(1);
                    }

                    createSpawner(configData.data);
                } else if (message.type === 'ERROR') {
                    console.log('Authentication failed. Please check your token.');
                    process.exit(1);
                }
            });
       


        ws.on('error', function error(err) {
            console.error('WebSocket error:', err);
            process.exit(1);
        });




    } catch (error) {
        console.log(error)
    }







}

spawnServer();