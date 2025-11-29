import type { IdentifierType, Vector4 } from '../common.types';
import type {
    QBGangData,
    QBItemData,
    QBJobData,
    QBNotificationType,
    QBVehicleData,
} from './common.types';
import type { QBPlayer } from './player.types';

export interface QBServerFunctions {
    // Player Management
    GetPlayer(source: number): QBPlayer | null;
    GetPlayerByCitizenId(citizenid: string): QBPlayer | null;
    GetPlayerByPhone(phoneNumber: string): QBPlayer | null;
    GetPlayers(): number[];
    GetQBPlayers(): Record<number, QBPlayer>;

    // Utility Functions
    GetCoords(entity: number): Vector4;
    GetIdentifier(source: number, idType: IdentifierType): string | null;
    GetSource(identifier: string): number | null;

    // Permission Functions
    HasPermission(source: number, permission: string): boolean;
    IsOptin(source: number): boolean;
    IsPlayerBanned(source: number): boolean;
    IsWhitelisted(source: number): boolean;

    // Item Functions
    GetItems(): Record<string, QBItemData>;
    UseItem(source: number, item: Record<string, unknown>): void;
    CanUseItem(source: number, itemName: string): boolean;

    // Vehicle Functions
    SpawnVehicle(source: number, model: string, coords: Vector4, warp: boolean): number;
    DeleteVehicle(vehicle: number): void;
    GetVehicles(): Record<string, QBVehicleData>;
    GetVehiclesByName(): Record<string, QBVehicleData>;

    // Job & Gang Functions
    GetJobs(): Record<string, QBJobData>;
    GetJob(jobName: string): QBJobData | null;
    GetGangs(): Record<string, QBGangData>;

    // String & Math Utilities
    RandomStr(length: number): string;
    RandomInt(length: number): number;
    SplitStr(str: string, delimiter: string): string[];
    Trim(value: string): string;
    Round(value: number, numDecimalPlaces?: number): number;

    // Notification Functions
    Notify(source: number, text: string, type?: QBNotificationType, length?: number): void;

    // Kick & Ban Functions
    Kick(
        source: number,
        reason: string,
        setKickReason?: ((reason: string) => void) | null,
        deferrals?: unknown,
    ): void;

    // Database Functions (Deprecated)
    /** @deprecated Use MySQL-Async directly instead */
    ExecuteSql(wait: boolean, query: string, cb?: (result: unknown) => void): void;
}

export interface QBServer {
    Functions: QBServerFunctions;
    Players: Record<number, QBPlayer>;
    Shared: {
        Items: Record<string, QBItemData>;
        Vehicles: Record<string, QBVehicleData>;
        Jobs: Record<string, QBJobData>;
        Gangs: Record<string, QBGangData>;
    };
}
