import type { Vector4 } from '../common.types';

export interface QBCharInfo {
    firstname: string;
    lastname: string;
    birthdate: string;
    gender: number;
    nationality: string;
    phone: string;
    account: string;
}

export interface QBJobGrade {
    name: string;
    level: number;
    payment: number;
    isboss?: boolean;
}

export interface QBJob {
    name: string;
    label: string;
    payment: number;
    onduty: boolean;
    grade: QBJobGrade;
    isboss?: boolean;
}

export interface QBGangGrade {
    name: string;
    level: number;
}

export interface QBGang {
    name: string;
    label: string;
    grade: QBGangGrade;
    isboss?: boolean;
}

export interface QBMoney {
    cash: number;
    bank: number;
    crypto: number;
}

export interface QBMetaData {
    hunger: number;
    thirst: number;
    stress: number;
    armor: number;
    ishandcuffed: boolean;
    inlaststand: boolean;
    isdead: boolean;
    injail: number;
    jailitems: Record<string, unknown>;
    status: unknown[];
    phone: unknown[];
    bloodtype: string;
    fingerprint: string;
    walletid: string;
    criminalrecord: {
        hasRecord: boolean;
        [key: string]: unknown;
    };
    licences: {
        driver: boolean;
        business: boolean;
        weapon: boolean;
        [key: string]: boolean;
    };
    inside: {
        house: string | null;
        apartment: {
            apartmentType: string | null;
            apartmentId: number | null;
        };
    };
    [key: string]: unknown;
}

export interface QBInventoryItem {
    name: string;
    amount: number;
    info: Record<string, unknown>;
    label: string;
    description: string;
    weight: number;
    type: string;
    unique: boolean;
    useable: boolean;
    image: string;
    shouldClose: boolean;
    slot: number;
    combinable: unknown;
}

export interface QBPlayerData {
    citizenid: string;
    cid: number;
    license: string;
    name: string;
    money: QBMoney;
    charinfo: QBCharInfo;
    job: QBJob;
    gang: QBGang;
    position: Vector4;
    metadata: QBMetaData;
    items: QBInventoryItem[];
    source?: number;
}

export interface QBItemData {
    name: string;
    label: string;
    weight: number;
    type: string;
    image: string;
    unique: boolean;
    useable: boolean;
    shouldClose: boolean;
    combinable: unknown;
    description: string;
}

export interface QBVehicleData {
    name: string;
    brand: string;
    model: string;
    price: number;
    category: string;
    hash: number;
    shop?: string;
}

export interface QBJobData {
    label: string;
    type?: string;
    defaultDuty: boolean;
    offDutyPay: boolean;
    grades: Record<string, QBJobGrade>;
}

export interface QBGangData {
    label: string;
    grades: Record<string, QBGangGrade>;
}

export type QBMoneyType = 'cash' | 'bank' | 'crypto';
export type QBNotificationType = 'primary' | 'success' | 'error' | 'info' | 'warning';
