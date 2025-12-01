import type { FrameworkAdapter } from '@server/adapters/framework/base';
import { QBAdapter } from '@server/adapters/framework/qb';
import { QBXAdapter } from '@server/adapters/framework/qbx';

export const detectFramework = (): FrameworkAdapter => {
    if (GetResourceState('qbx_core') === 'started') {
        return new QBXAdapter();
    }

    if (GetResourceState('qb-core') === 'started') {
        return new QBAdapter();
    }

    throw new Error('No supported framework detected!');
};
