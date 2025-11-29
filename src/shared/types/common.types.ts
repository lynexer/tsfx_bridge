export type IdentifierType = 'steam' | 'license' | 'discord' | 'fivem' | 'ip';

export interface Vector3 {
    x: number;
    y: number;
    z: number;
}

export interface Vector4 extends Vector3 {
    w: number;
}
