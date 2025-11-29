import type { QBInventoryItem, QBMoneyType, QBPlayerData } from './common.types';

export interface QBPlayerFunctions {
    UpdatePlayerData(): void;

    SetJob(job: string, grade: number): boolean;
    SetGang(gang: string, grade: number): boolean;
    SetJobDuty(onDuty: boolean): void;

    AddMoney(moneyType: QBMoneyType, amount: number, reason?: string): boolean;
    RemoveMoney(moneyType: QBMoneyType, amount: number, reason?: string): boolean;
    SetMoney(moneyType: QBMoneyType, amount: number, reason?: string): boolean;
    GetMoney(moneyType: QBMoneyType): number;

    AddItem(item: string, amount: number, slot?: number, info?: Record<string, unknown>): boolean;
    RemoveItem(item: string, amount: number, slot?: number): boolean;
    GetItemByName(item: string): QBInventoryItem | null;
    GetItemBySlot(slot: number): QBInventoryItem | null;
    GetItemsByName(item: string): QBInventoryItem[];

    SetInventory(items: QBInventoryItem[], dontUpdateWeight?: boolean): void;
    ClearInventory(filterItems?: string[]): void;

    SetMetaData(meta: string, value: unknown): void;
    GetMetaData(meta: string): unknown;

    Save(): void;
    Logout(): void;
}

export interface QBPlayer {
    PlayerData: QBPlayerData;
    Functions: QBPlayerFunctions;
}
