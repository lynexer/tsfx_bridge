// biome-ignore lint/suspicious/noExplicitAny: RPC Method need any types
export type RPCHandler = (...args: any[]) => any;

export interface RPCMethod {
    name: string;
    handler: RPCHandler;
    description?: string;
    params?: ParameterDef[];
    returns?: string;
    category?: 'mutation' | 'query';
}

export interface ParameterDef {
    name: string;
    type: string;
    description?: string;
    optional?: boolean;
}

export interface ModuleDef {
    name: string;
    description?: string;
    methods: RPCMethod[];
}
