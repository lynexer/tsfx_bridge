export interface Gang {
    name: string;
    label: string;
    isAdmin: boolean;
    grade: {
        name: string;
        label?: string;
        level: number;
    };
}

export interface Job {
    name: string;
    label: string;
    salary?: number;
    onDuty: boolean;
    category?: string;
    isAdmin: boolean;
    grade: {
        name: string;
        label?: string;
        level: number;
    };
}

export interface Character {
    firstName: string;
    lastName: string;
    job: Job;
    gang?: Gang;
    metadata?: Record<string, unknown>;
    accounts: {
        cash: number;
        bank: number;
        dirtyMoney?: number;
        [key: string]: number | undefined;
    };
}

export interface Player {
    source?: number;
    identifier: string;
    license: string;
    username: string;
    character: Character;
}
