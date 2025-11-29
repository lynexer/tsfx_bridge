import { logger } from '@shared/utils/logger';

class Bridge {
    async initialize() {
        logger.info('='.repeat(30));
        logger.info('Initializing Bridge...');
        logger.info(
            `Version: ${GetResourceMetadata(GetCurrentResourceName(), 'version', 0) ?? '0.0.0'}`,
        );
        logger.info('='.repeat(30));
    }
}

export const bridge = new Bridge();

on('onServerResourceStart', (resourceName: string) => {
    if (resourceName === GetCurrentResourceName()) {
        bridge.initialize().catch((error) => {
            logger.fatal('Failed to start bridge:', error);
        });
    }
});
