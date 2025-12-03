import { registerRPCMethods } from '@server/decorators/rpc';

export abstract class BridgeModule {
    constructor() {
        registerRPCMethods(this);
    }

    abstract getName(): string;
    registerEvents?(): void;
}
