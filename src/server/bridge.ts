import { BridgeEvents } from '@shared/constants/events';
import { configureLoggerFromConvars, logger } from '@shared/utils/logger';
import type { FrameworkAdapter } from './adapters/framework/base';
import { detectFramework } from './detection/framework';
import { eventEmitter } from './events/emitter';
import type { BridgeModule } from './modules/base';
import { registerModules } from './registry/module-registry';
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
            this.modules = registerModules(this.frameworkAdapter);
            this.modules.forEach((module) => {
                logger.debug(`Registered module: ${module.getName()}`);
            });

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

    private registerEvents(): void {
        this.modules.forEach((module) => {
            if (module.registerEvents) {
                module.registerEvents();
                logger.debug(`Registered events for: ${module.getName()}`);
            }
        });
    }

    async call(path: string, ...args: unknown[]): Promise<unknown> {
        try {
            logger.trace(`RPC call: ${path}`, args);
            return await registry.call(path, ...args);
        } catch (error) {
            logger.error(`RPC call failed: ${path}`, error);
            throw error;
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

on('onServerResourceStop', (resourcename: string) => {
    if (resourcename === GetCurrentResourceName()) {
        logger.info('Shutting down bridge...');
    }
});

exports('_call', async (path: string, ...args: unknown[]) => {
    return await bridge.call(path, ...args);
});
