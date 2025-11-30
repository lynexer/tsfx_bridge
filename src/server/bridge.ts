import { logger } from '@shared/utils/logger';
import type { FrameworkAdapter } from './adapters/framework/base';
import { detectFramework } from './detection/framework';

class Bridge {
    private frameworkAdapter?: FrameworkAdapter;

    async initialize() {
        logger.info('='.repeat(30));
        logger.info('Initializing Bridge...');
        logger.info(
            `Version: ${GetResourceMetadata(GetCurrentResourceName(), 'version', 0) ?? '0.0.0'}`,
        );
        logger.info('='.repeat(30));

        try {
            logger.debug('Detecting framework...');
            this.frameworkAdapter = detectFramework();

            logger.info(`Framework: ${this.frameworkAdapter.getName()}`);
        } catch (error) {
            logger.fatal('', error);
        }
    }
}

const bridge = new Bridge();

on('onServerResourceStart', (resourceName: string) => {
    if (resourceName === GetCurrentResourceName()) {
        bridge.initialize().catch((error) => {
            logger.fatal('Failed to start bridge:', error);
        });
    }
});
