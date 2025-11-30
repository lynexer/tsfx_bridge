export const BridgeEvents = {
    READY: 'tsfx:ready',

    PLAYER_LOADED: 'tsfx:playerLoaded',
    PLAYER_UNLOADED: 'tsfx:playerUnloaded',
} as const;

export type BridgeEventName = (typeof BridgeEvents)[keyof typeof BridgeEvents];
