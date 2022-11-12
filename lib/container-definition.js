export const DEFAULT_CONTAINER_DFINITIONS = [
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
];
export function safeGetContainerDefinitions(definitions) {
    return definitions == undefined ?
        DEFAULT_CONTAINER_DFINITIONS : validateContainerDefinitions(definitions);
}
export function validateContainerDefinitions(definitions) {
    const isContainerDefinition = definitions.every(definition => DEFINITION_CONDITIONS.every(condition => condition(definition)));
    const notConflictMarker = definitions.map(definition => definition.options.marker)
        .filter((value, index, array) => array.indexOf(value) == index)
        .length == definitions.length;
    if (isContainerDefinition && notConflictMarker) {
        return definitions;
    }
    else {
        throw new Error("definitions is not ContainerDefinitions.");
    }
}
function isClassName(test) {
    var _a;
    return ((_a = /^[A-Za-z0-9]+(-?[A-Za-z0-9]+)*$/.exec(test)) === null || _a === void 0 ? void 0 : _a.length) != 0;
}
const DEFINITION_CONDITIONS = [
    (definition) => isClassName(definition.containerName),
    (definition) => definition.options.marker.length == 1
];
