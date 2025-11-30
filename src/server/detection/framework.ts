import type { FrameworkAdapter } from '@server/adapters/framework/base';
import { QBAdapter } from '@server/adapters/framework/qb';

export const detectFramework = (): FrameworkAdapter => {
    if (GetResourceState('qb-core') === 'started') {
        return new QBAdapter();
    }

    throw new Error('No supported framework detected!');
};
