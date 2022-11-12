import Renderer from "markdown-it/lib/renderer";
import Token from "markdown-it/lib/token";
export declare interface ContainerDefinition {
    containerName: string;
    options: {
        marker: string;
        validate?(params: string): boolean;
        render?(tokens: Token[], index: number, options: any, env: any, self: Renderer): string;
    };
}
export declare const DEFAULT_CONTAINER_DFINITIONS: ContainerDefinition[];
export declare function safeGetContainerDefinitions(definitions?: ContainerDefinition[]): ContainerDefinition[];
export declare function validateContainerDefinitions(definitions: ContainerDefinition[]): ContainerDefinition[];
