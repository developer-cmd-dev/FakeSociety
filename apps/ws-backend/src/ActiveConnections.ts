import type { Users } from "./Users";

export class ActiveConnections {
    private connections: Map<string, Users>;

    constructor() {
        this.connections = new Map<string, Users>();
    }

    addConnection(user: Users): void {
        this.connections.set(user.id, user);
    }

    removeConnection(id: string): void {
        this.connections.delete(id);
    }

    getConnection(id: string): Users | undefined {
        return this.connections.get(id);
    }

    getAllConnections(): Users[] {
        return Array.from(this.connections.values());
    }
}