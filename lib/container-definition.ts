import Renderer from "markdown-it/lib/renderer";
import Token from "markdown-it/lib/token";


export declare interface ContainerDefinition {
    containerName: string;
    options: {
        marker: string;
        validate?(params: string): boolean;
        render?(tokens: Token[], index: number, options: any, env: any, self: Renderer): string;
    }
}

export const DEFAULT_CONTAINER_DFINITIONS: ContainerDefinition[] = [
    {
        containerName: 'grid',
        options: {
            marker: ':'
        }
    },
    {
        containerName: 'grid-item',
        options: {
            marker: '+'
        }
    }
]


export function safeGetContainerDefinitions(definitions?: ContainerDefinition[]): ContainerDefinition[] {
    return definitions == undefined ?
        DEFAULT_CONTAINER_DFINITIONS : validateContainerDefinitions(definitions);
}

export function validateContainerDefinitions(definitions: ContainerDefinition[]): ContainerDefinition[] {
    const isContainerDefinition = definitions.every(definition =>
        DEFINITION_CONDITIONS.every(condition => condition(definition)));
    const notConflictMarker = definitions.map(definition => definition.options.marker)
        .filter((value, index, array) => array.indexOf(value) == index)
        .length == definitions.length;
    if (isContainerDefinition && notConflictMarker) {
        return definitions;
    } else {
        throw new Error("definitions is not ContainerDefinitions.");
    }
}

function isClassName(test: string): boolean {
    return (/^[A-Za-z0-9]+(-?[A-Za-z0-9]+)*$/.exec(test)?.length) != 0;
}

type Condition<T> = (thisObject: T) => boolean;

const DEFINITION_CONDITIONS: Array<Condition<ContainerDefinition>> = [
    (definition) => isClassName(definition.containerName),
    (definition) => definition.options.marker.length == 1
]
