import type { BridgeEventName } from '@shared/constants/events';

export class EventEmitter {
    emit(eventName: BridgeEventName | string, ...args: unknown[]): void {
        emit(eventName, ...args);
    }

    emitClient(source: number, eventName: BridgeEventName | string, ...args: unknown[]): void {
        emitNet(eventName, source, ...args);
    }

    emitAllClients(eventName: BridgeEventName | string, ...args: unknown[]): void {
        emitNet(eventName, -1, ...args);
    }
}

export const eventEmitter = new EventEmitter();
