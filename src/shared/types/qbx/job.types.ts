export interface QBXJobGradeData {
    name: string;
    isboss?: boolean;
    bankAuth?: boolean;
    payment: number;
}

export interface QBXJobData {
    label: string;
    type?: string;
    defaultDuty: boolean;
    offDutyPay: boolean;
}

export interface QBXJob extends QBXJobData {
    grades: Record<number, QBXJobGradeData>;
}
