import { FrameworkAdapter } from "@server/adapters/framework/base";
import { BridgeModule } from "./base";
import { Player } from "@shared/types/player.types";

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
        // TODO
    }

    getPlayer(source: number): Player | null {
        return this.adapter.getPlayer(source);
    }
}