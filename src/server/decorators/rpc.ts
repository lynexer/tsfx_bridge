import { registry } from '@server/registry/registry';
import type { ParameterDef, RPCHandler } from '@server/registry/types';

export interface RPCMethodConfig {
    name: string;
    description?: string;
    category?: 'mutation' | 'query';
    params?: ParameterDef[];
    returns?: string;
}

export const RPCMethod = (config: RPCMethodConfig) => {
    return <T extends RPCHandler>(
        _target: object,
        _propertyKey: string,
        descriptor: TypedPropertyDescriptor<T>,
    ): TypedPropertyDescriptor<T> => {
        const originalMethod = descriptor.value;

        registry.register({
            name: config.name,
            handler: originalMethod as RPCHandler,
            description: config.description,
            params: config.params,
            returns: config.returns,
            category: config.category || 'mutation',
        });

        return descriptor;
    };
};
