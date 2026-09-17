import z from 'zod';
export const WebSocketMessageSchema = z.object({
  type: z.string(),
  payload: z.any(),
});

export type WebSocketMessage<T = any> = z.infer<typeof WebSocketMessageSchema> & {
  payload: T;
};

export const ConnectionPayloadSchema = z.object({
  id: z.string(),
  username: z.string(),
});

export type ConnectionPayload = z.infer<typeof ConnectionPayloadSchema>;

export const SpawnerConnectionPayloadSchema = z.object({
  authToken: z.string(),
});

export type SpawnerPayload = z.infer<typeof SpawnerConnectionPayloadSchema>;

export const ConfigurationDataSchema = z.object({
  websocketConnectionUrl: z.string(),
  usersCount: z.number(),
  typeSchema: z.object({}).optional(),
  userId: z.string(),
  virtualUsersPayload: z.array(z.object({})).optional(),
});

// export type ConfigurationData = z.infer<typeof ConfigurationDataSchema>;