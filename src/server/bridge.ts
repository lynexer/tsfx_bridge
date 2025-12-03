import { BridgeEvents } from '@shared/constants/events';
import { configureLoggerFromConvars, logger } from '@shared/utils/logger';
import type { FrameworkAdapter } from './adapters/framework/base';
import { detectFramework } from './detection/framework';
import { eventEmitter } from './events/emitter';
import type { BridgeModule } from './modules/base';
import { registerModules } from './registry/module-registry';
import { registry } from './registry/registry';

class Bridge {
    private version: string = '0.0.0';
    private modules: BridgeModule[] = [];
    private frameworkAdapter?: FrameworkAdapter;

    async initialize() {
        configureLoggerFromConvars('bridge');

        this.version = GetResourceMetadata(GetCurrentResourceName(), 'version', 0) ?? '0.0.0';

        logger.info('='.repeat(30));
        logger.info('Initializing Bridge...');
        logger.info(`Version: ${this.version}`);
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

    getInfo() {
        return {
            version: this.version,
            framework: this.frameworkAdapter?.getName(),
            methods: registry.count(),
            modules: this.modules.map((m) => m.getName()),
        };
    }

    getMethods() {
        return registry.getAll().map((m) => ({
            name: m.name,
            description: m.description,
            category: m.category,
            params: m.params,
            returns: m.returns,
        }));
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

exports('GetInfo', () => {
    return bridge.getInfo();
});

exports('GetMethods', () => {
    return bridge.getMethods();
});

exports('GetMethodsByModule', (moduleName: string) => {
    return registry.getAllByPrefix(`${moduleName}.`).map((m) => ({
        name: m.name,
        description: m.description,
        category: m.category,
        params: m.params,
        returns: m.returns,
    }));
});

RegisterCommand(
    'tsfx:info',
    () => {
        const info = bridge.getInfo();

        console.log('='.repeat(30));
        console.log('[TSFX] Bridge Information');
        console.log('='.repeat(30));
        console.log(`Version: ${info.version}`);
        console.log(`Framework: ${info.framework}`);
        console.log(`RPC Methods: ${info.methods}`);
        console.log(`Modules: ${info.modules.join(', ')}`);
        console.log('='.repeat(30));
    },
    true,
);

RegisterCommand(
    'tsfx:methods',
    () => {
        const methods = bridge.getMethods();

        console.log('='.repeat(30));
        console.log(`[TSFX] Registered Methods (${methods.length})`);
        console.log('='.repeat(30));

        const grouped = new Map<string, typeof methods>();

        methods.forEach((m) => {
            const [module] = m.name.split('.');
            if (!grouped.has(module)) {
                grouped.set(module, []);
            }
            grouped.get(module)?.push(m);
        });

        grouped.forEach((methods, module) => {
            console.log(`\n[${module.toUpperCase()}] (${methods.length} methods)`);

            methods.forEach((m) => {
                const params = m.params?.map((p) => `${p.name}: ${p.type}`).join(', ') || '';

                console.log(`  ${m.name}(${params}) -> ${m.returns || 'void'}`);

                if (m.description) {
                    console.log(`    ${m.description}`);
                }
            });
        });

        console.log('='.repeat(30));
    },
    true,
);
