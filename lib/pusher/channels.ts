// Channel + event vocabulary, shared between server and client.

export const PROJECT_CHANNEL = (projectId: string) => `private-project-${projectId}`;

export const EV = {
  // Server → client mutation broadcasts
  MESSAGE_NEW: "message:new",
  TODO_UPSERT: "todo:upsert",
  TODO_DELETE: "todo:delete",
  ASSET_UPSERT: "asset:upsert",
  ASSET_DELETE: "asset:delete",
  NOTES_UPDATE: "notes:update",
  PROJECT_UPDATE: "project:update",
  // Client → client typing indicator. Sent through Pusher's
  // `client-*` event mechanism on private channels (must be enabled
  // in the Pusher app dashboard under Settings → "Enable client
  // events"). Stays on the wire only between subscribers, never
  // touches our server.
  TYPING: "client-typing",
} as const;
