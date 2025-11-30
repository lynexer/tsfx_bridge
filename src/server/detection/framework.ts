import type { FrameworkAdapter } from '@server/adapters/framework/base';
import { QBAdapter } from '@server/adapters/framework/qb';
import { QBXAdapter } from '@server/adapters/framework/qbx';

export const detectFramework = (): FrameworkAdapter => {
    if (GetResourceState('qb-core') === 'started') {
        return new QBAdapter();
    }

    if (GetResourceState('qbx_core') === 'started') {
        return new QBXAdapter();
    }

    throw new Error('No supported framework detected!');
};
