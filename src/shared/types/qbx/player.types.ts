export interface QBXPlayerJobGrade {
    name: string;
    level: number;
}

export interface QBXPlayerJob {
    name: string;
    label: string;
    payment: number;
    type?: string;
    onduty: boolean;
    isboss: boolean;
    grade: QBXPlayerJobGrade;
}

export interface QBXPlayerGangGrade {
    name: string;
    level: number;
}

export interface PlayerGang {
    name: string;
    label: string;
    isboss: boolean;
    grade: QBXPlayerGangGrade;
}

export interface QBXPlayerCharInfo {
    firstname: string;
    lastname: string;
    birthdate: string;
    nationality: string;
    cid: number;
    gender: number;
    backstory: string;
    phone: string;
    account: string;
    card: number;
}

export interface QBXPlayerMoney {
    cash: number;
    bank: number;
    crypto: number;
}

export interface QBXPlayerPhoneData {
    SerialNumber: string;
    InstalledApps: unknown[];
}

export interface QBXPlayerCriminalRecord {
    hasRecord: number;
    date?: unknown[];
}

export interface QBXPlayerLicences {
    id: boolean;
    driver: boolean;
    weapon: boolean;
}

export interface QBXPlayerApartmentInfo {
    apartmentType?: unknown;
    apartmentId?: number;
}

export interface QBXPlayerInsideInfo {
    house?: unknown;
    apartment: QBXPlayerApartmentInfo;
}

export interface QBXPlayerJobRep {
    tow: number;
    trucker: number;
    taxi: number;
    hotdog: number;
}

export interface QBXPlayerPhoneMetadata {
    background: unknown;
    profilepicture: unknown;
}

export interface QBXPlayerMetadata {
    health: number;
    armor: number;
    hunger: number;
    thirst: number;
    stress: number;
    isdead: boolean;
    inlaststand: boolean;
    ishandcuffed: boolean;
    tracker: boolean;
    injail: number;
    jailitems: Record<string, unknown>;
    status: unknown[];
    phone: QBXPlayerPhoneMetadata;
    bloodtype: string;
    dealerrep: number;
    craftingrep: number;
    attachmentcraftingrep: number;
    currentapartment?: number;
    jobrep: QBXPlayerJobRep;
    callsign: string;
    fingerprint: string;
    walletid: string;
    criminalrecord: QBXPlayerCriminalRecord;
    licences: QBXPlayerLicences;
    inside: QBXPlayerInsideInfo;
    phonedata: QBXPlayerPhoneData;
}

export interface QBXPlayerEntity {
    citizenid: string;
    license: string;
    name: string;
    money: QBXPlayerMoney;
    charinfo: QBXPlayerCharInfo;
    job: QBXPlayerJob;
    jobs: Record<string, number>;
    gang: PlayerGang;
    gangs: Record<string, number>;
    position: [number, number, number, number];
    metadata: QBXPlayerMetadata;
    cid: number;
    items: unknown[];
    lastLoggedOut: number;
}

export interface QBXPlayerData extends QBXPlayerEntity {
    source?: number;
    optin?: boolean;
}

export interface QBXPlayer {
    Functions: Record<string, unknown>;
    PlayerData: QBXPlayerData;
    Offline: boolean;
}
