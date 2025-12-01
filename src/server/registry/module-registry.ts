import type { FrameworkAdapter } from '@server/adapters/framework/base';
import type { BridgeModule } from '@server/modules/base';
import { PlayerModule } from '@server/modules/player';

export const registerModules = (frameworkAdapter: FrameworkAdapter): BridgeModule[] => {
    const modules: BridgeModule[] = [];

    modules.push(new PlayerModule(frameworkAdapter));

    return modules;
};
