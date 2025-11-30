export abstract class BridgeModule {
    abstract getName(): string;
    registerEvents?(): void;
}