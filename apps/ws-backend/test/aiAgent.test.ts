import {test,expect} from 'bun:test';
import { generateResponse } from '../src/agent/ollama';




test("sdkTesting",async () => {
  const data = {
  "wsConnectionUrl": "ws://localhost:8080",
  "usersCount":10,
  "typeSchema": {
    "name": "string",
    "userId": "string",
  },
}
  const result = await generateResponse(JSON.stringify(data));
  console.log(result);
  expect(result).toBeString();
},1000000);