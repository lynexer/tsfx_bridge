import type { Vector3, Vector4 } from '../common.types';
import type { QBInventoryItem, QBNotificationType, QBPlayerData } from './common.types';
import type { QBVehicleProperties } from './vehicle.types';

export interface ProgressbarDisableOptions {
    disableMovement?: boolean;
    disableCarMovement?: boolean;
    disableMouse?: boolean;
    disableCombat?: boolean;
}

export interface ProgressbarAnimation {
    animDict: string;
    anim: string;
    flags?: number;
}

export interface ProgressbarProp {
    model: string;
    bone: number;
    coords: Vector3;
    rotation: Vector3;
}

export interface QBClientFunctions {
    // Player Data
    GetPlayerData(): QBPlayerData;

    // Callbacks
    TriggerCallback<T = unknown>(name: string, cb: (result: T) => void, ...args: unknown[]): void;

    // Inventory & Item Helpers
    HasItem(item: string, amount?: number): boolean;
    HasItem(items: string[]): [boolean, string[]];
    GetItemsByName(item: string): QBInventoryItem[];

    // Interaction & Feedback
    Notify(text: string, type?: QBNotificationType, length?: number): void;

    Progressbar(
        name: string,
        label: string,
        duration: number,
        useWhileDead?: boolean,
        canCancel?: boolean,
        disable?: ProgressbarDisableOptions,
        anim?: ProgressbarAnimation,
        prop?: ProgressbarProp,
        propTwo?: ProgressbarProp,
        onFinish?: () => void,
        onCancel?: () => void,
    ): void;

    DrawText3D(x: number, y: number, z: number, text: string): void;

    // World & Entity Helpers
    GetClosestPlayer(coords?: Vector3): [number, number]; // [playerId, distance]
    GetClosestVehicle(coords?: Vector3): number;
    GetClosestObject(coords?: Vector3, modelFilter?: string | number | (string | number)[]): number;

    GetStreetLabel(): string;
    GetZoneLabel(): string;
    GetCardinalDirection(): string;

    // Vehicle Functions
    SpawnVehicle(
        model: string | number,
        coords?: Vector3 | Vector4,
        warp?: boolean,
        cb?: (vehicle: number) => void,
        networked?: boolean,
    ): void;

    SetVehicleProperties(vehicle: number, props: Partial<QBVehicleProperties>): void;
    GetVehicleProperties(vehicle: number): QBVehicleProperties;
    DeleteVehicle(vehicle: number): void;
    GetPlate(vehicle: number): string;
}

export interface QBClient {
    Functions: QBClientFunctions;
    PlayerData: QBPlayerData;
}
