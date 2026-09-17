import {test,expect} from "bun:test";
import { createSpawner } from "../spawner";

test("spawner test",async()=>{
    const generatedUser = [
    {
      "userId": "user_001",
      "username": "dev_sharma_001",
      "name": "Rahul Sharma"
    },
    {
      "userId": "user_002",
      "username": "priya_verma_002",
      "name": "Priya Verma"
    },
    {
      "userId": "user_003",
      "username": "amit_kumar_003",
      "name": "Amit Kumar"
    },
    {
      "userId": "user_004",
      "username": "neha_singh_004",
      "name": "Neha Singh"
    },
    {
      "userId": "user_005",
      "username": "arjun_patel_005",
      "name": "Arjun Patel"
    },
    {
      "userId": "user_006",
      "username": "ananya_das_006",
      "name": "Ananya Das"
    },
    {
      "userId": "user_007",
      "username": "rohit_mehta_007",
      "name": "Rohit Mehta"
    },
    {
      "userId": "user_008",
      "username": "sneha_nair_008",
      "name": "Sneha Nair"
    },
    {
      "userId": "user_009",
      "username": "vishal_gupta_009",
      "name": "Vishal Gupta"
    },
    {
      "userId": "user_010",
      "username": "sunita_rao_010",
      "name": "Sunita Rao"
    }
  ]
    const response = createSpawner({websocketConnectionUrl:"ws://localhost:8080",usersCount:5,userId:"test-user",payload:{users:generatedUser}  });
})