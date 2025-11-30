import type { QBXGang } from './gang.types';
import type { QBXJob } from './job.types';
import type { QBXPlayer, QBXPlayerData } from './player.types';
import type { QBXVehicle } from './vehicle.types';

export * from './gang.types';
export * from './job.types';
export * from './player.types';
export * from './vehicle.types';

export interface QBXSharedData {
    Jobs: Record<string, QBXJob>;
    Gangs: Record<string, QBXGang>;
    Vehicles: Record<string, QBXVehicle>;
}

export interface QBXServer {
    GetPlayer(source: number): QBXPlayer | null;
    GetPlayerByCitizenId(citizenid: string): QBXPlayer | null;
    GetOfflinePlayer(citizenid: string): QBXPlayer | null;
    GetPlayers(): number[];
    GetQBPlayers(): Record<number, QBXPlayer>;

    GetJobs(): Record<string, QBXJob>;
    GetJob(name: string): QBXJob | null;

    GetGangs(): Record<string, QBXGang>;
    GetGang(name: string): QBXGang | null;

    GetVehicles(): Record<string, QBXVehicle>;
    GetVehiclesByName(): Record<string, QBXVehicle>;
    GetVehiclesByCategory(): Record<string, QBXVehicle[]>;
    GetVehiclesByHash(): Record<number, QBXVehicle>;
}

export interface QBXClient {
    GetPlayerData(): QBXPlayerData;

    GetJobs(): Record<string, QBXJob>;
    GetGangs(): Record<string, QBXGang>;
    GetVehicles(): Record<string, QBXVehicle>;
}
