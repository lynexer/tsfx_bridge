import type { Player } from '@shared/types/player.types';
import type { FrameworkAdapter } from './base';

export class DevFrameworkAdapter implements FrameworkAdapter {
    getName(): string {
        return 'Dev';
    }

    getPlayer(_source: number): Player | null {
        return null;
    }

    getPlayerByIdentifier(_identifier: string): Player | null {
        return null;
    }

    onPlayerLoaded(_callback: (source: number, player: Player) => void): void {
        // No-op
    }

    onPlayerUnloaded(_callback: (source: number) => void): void {
        // No-op
    }
}
