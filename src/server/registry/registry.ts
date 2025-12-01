import { logger } from '@shared/utils/logger';
import type { RPCMethod } from './types';

export class RPCRegistry {
    private methods: Map<string, RPCMethod> = new Map();

    register(method: RPCMethod): void {
        if (this.methods.has(method.name)) {
            logger.warn(`Method ${method.name} already registered, overwriting...`);
        }

        this.methods.set(method.name, method);
    }

    registerBatch(methods: RPCMethod[]): void {
        methods.forEach((method) => {
            this.register(method);
        });
    }

    get(name: string): RPCMethod | undefined {
        return this.methods.get(name);
    }

    async call(name: string, ...args: unknown[]): Promise<unknown> {
        const method = this.methods.get(name);

        if (!method) {
            throw new Error(`RPC method not found: ${name}`);
        }

        return await method.handler(...args);
    }

    getAll(): RPCMethod[] {
        return Array.from(this.methods.values());
    }

    count(): number {
        return this.methods.size;
    }
}

export const registry = new RPCRegistry();
