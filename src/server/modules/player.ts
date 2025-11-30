import type { FrameworkAdapter } from '@server/adapters/framework/base';
import { eventEmitter } from '@server/events/emitter';
import { BridgeEvents } from '@shared/constants/events';
import type { Player } from '@shared/types/player.types';
import { BridgeModule } from './base';

export class PlayerModule extends BridgeModule {
    private adapter: FrameworkAdapter;

    constructor(adapter: FrameworkAdapter) {
        super();
        this.adapter = adapter;
    }

    getName(): string {
        return 'player';
    }

    registerEvents(): void {
        this.adapter.onPlayerLoaded((source, player) => {
            eventEmitter.emit(BridgeEvents.PLAYER_LOADED, source, player);
        });

        this.adapter.onPlayerUnloaded((source) => {
            eventEmitter.emit(BridgeEvents.PLAYER_UNLOADED, source);
        });
    }

    getPlayer(source: number): Player | null {
        return this.adapter.getPlayer(source);
    }
}
