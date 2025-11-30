export interface QBXGangGradeData {
    name: string;
    isboss?: boolean;
    bankAuth?: boolean;
}

export interface QBXGangData {
    label: string;
}

export interface QBXGang extends QBXGangData {
    grades: Record<number, QBXGangGradeData>;
}
