import type { ConfigurationData } from "@repo/types/WebsocketTypes";



export async function createSpawner(configData: ConfigurationData) {

    const wokerArr: Worker[] = [];

    for (let i = 0; i < 10; i++) {
        const worker = new Worker('./worker.ts');
        worker.postMessage('Hello worker')
    }



}