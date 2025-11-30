import type { Player } from '@shared/types/player.types';
import type { QBPlayer, QBServer } from '@shared/types/qb';
import type { FrameworkAdapter } from './base';

export class QBAdapter implements FrameworkAdapter {
    private core: QBServer;

    constructor() {
        this.core = exports['qb-core'].GetCoreObject();
    }

    getName(): string {
        return 'QBCore';
    }

    getPlayer(source: number): Player | null {
        const player = this.core.Functions.GetPlayer(source);
        if (!player) return null;

        return this.normalizePlayer(player);
    }

    getPlayerByIdentifier(identifier: string): Player | null {
        const player = this.core.Functions.GetPlayerByCitizenId(identifier);
        if (!player) return null;

        return this.normalizePlayer(player);
    }

    onPlayerLoaded(callback: (source: number, player: Player) => void): void {
        on('QBCore:Server:PlayerLoaded', (player: QBPlayer) => {
            callback(player.PlayerData.source as number, this.normalizePlayer(player));
        });
    }

    onPlayerUnloaded(callback: (source: number) => void): void {
        on('QBCore:Server:OnPlayerUnload', (source: number) => {
            callback(source);
        });
    }

    private normalizePlayer(player: QBPlayer): Player {
        return {
            source: player.PlayerData.source,
            identifier: player.PlayerData.citizenid,
            license: player.PlayerData.license,
            username: player.PlayerData.name,
            character: {
                firstName: player.PlayerData.charinfo.firstname,
                lastName: player.PlayerData.charinfo.lastname,
                job: {
                    name: player.PlayerData.job.name,
                    label: player.PlayerData.job.label,
                    onDuty: player.PlayerData.job.onduty,
                    isAdmin: !!player.PlayerData.job.isboss,
                    salary: player.PlayerData.job.grade.payment,
                    grade: {
                        name: player.PlayerData.job.grade.name,
                        label: player.PlayerData.job.grade.name,
                        level: player.PlayerData.job.grade.level,
                    },
                },
                accounts: {
                    cash: player.PlayerData.money.cash,
                    bank: player.PlayerData.money.bank,
                },
            },
        };
    }
}
