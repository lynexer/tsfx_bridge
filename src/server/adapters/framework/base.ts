import type { Player } from '@shared/types/player.types';

export interface FrameworkAdapter {
    getName(): string;
    getPlayer(source: number): Player | null;
    getPlayerByIdentifier(identifier: string): Player | null;
}
