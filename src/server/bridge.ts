import { BridgeEvents } from '@shared/constants/events';
import { configureLoggerFromConvars, logger } from '@shared/utils/logger';
import type { FrameworkAdapter } from './adapters/framework/base';
import { detectFramework } from './detection/framework';
import { eventEmitter } from './events/emitter';
import type { BridgeModule } from './modules/base';
import { PlayerModule } from './modules/player';
import { registry } from './registry/registry';

class Bridge {
    private modules: BridgeModule[] = [];
    private frameworkAdapter?: FrameworkAdapter;

    async initialize() {
        configureLoggerFromConvars('bridge');

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

            logger.debug('Registering modules...');
            this.registerModule(new PlayerModule(this.frameworkAdapter));

            logger.debug('Registering events...');
            this.registerEvents();

            logger.info('='.repeat(30));
            logger.info(`Successfully initialized with ${registry.count()} RPC methods`);
            logger.info('='.repeat(30));

            eventEmitter.emit(BridgeEvents.READY);
        } catch (error) {
            logger.fatal('', error);
        }
    }

    private registerModule(module: BridgeModule): void {
        this.modules.push(module);
        logger.debug(`Registered module: ${module.getName()}`);
    }

    private registerEvents(): void {
        this.modules.forEach((module) => {
            if (module.registerEvents) {
                module.registerEvents();
                logger.debug(`Registered events for: ${module.getName()}`);
            }
        });
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
