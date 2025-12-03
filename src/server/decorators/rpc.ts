import { registry } from '@server/registry/registry';
import type { ParameterDef, RPCHandler } from '@server/registry/types';

export interface RPCMethodConfig {
    name: string;
    description?: string;
    category?: 'mutation' | 'query';
    params?: ParameterDef[];
    returns?: string;
}

const RPC_METADATA_KEY = Symbol('rpcMethods');

export const RPCMethod = (config: RPCMethodConfig) => {
    return <T extends RPCHandler>(
        // biome-ignore lint/suspicious/noExplicitAny: RPC target need any types
        target: any,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<T>,
    ): TypedPropertyDescriptor<T> => {
        if (!target[RPC_METADATA_KEY]) {
            target[RPC_METADATA_KEY] = [];
        }

        target[RPC_METADATA_KEY].push({
            config,
            propertyKey,
            method: descriptor.value,
        });

        return descriptor;
    };
};

export const registerRPCMethods = (instance: object): void => {
    const metadata = instance.constructor.prototype[RPC_METADATA_KEY];

    if (metadata) {
        for (const { config, method } of metadata) {
            registry.register({
                name: config.name,
                handler: method as RPCHandler,
                instance: instance,
                description: config.description,
                params: config.params,
                returns: config.returns,
                category: config.category || 'mutation',
            });
        }
    }
};
