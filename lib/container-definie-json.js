const { isClassName, usePrimitiveExtention } = require('./common');

usePrimitiveExtention();

const DEFAULT_CONTAINER_DFINE_JSONS = [
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

const CONTAINER_DEFINE_JSON_CONDITIONS = [
    (definition) => typeof definition == "object",
    (definition) => definition["containerName"] != undefined,
    (definition) => typeof definition["containerName"] == "string",
    (definition) => isClassName(definition.containerName),
    (definition) => definition["options"] != undefined,
    (definition) => typeof definition.options["marker"] == "string",
    (definition) => definition.options.marker.length == 1,
    (definition) => typeof definition.options["validate"] == "undefined"
        || typeof definition.options["validate"] == "function",
    (definition) => typeof definition.options["render"] == "undefined"
        || typeof definition.options["render"] == "function"
];

const CONTAINER_DEFINE_JSONS_CONDITIONS = [
    Array.isArray,
    (definitions) => definitions.every(isContainerDefineJson),
    (definitions) => definitions
        .map(definition => definition.containerName)
        .every((containerName, idx, containerNames) => containerNames.indexOf(containerName) == idx),
    (definitions) => definitions
        .map(definition => definition.options.marker)
        .every((marker, idx, markers) => markers.indexOf(marker) == idx)
];

// const isContainerDefineJson = (definition) =>
//     CONTAINER_DEFINE_JSON_CONDITIONS.every((condition) => condition(definition));
const isContainerDefineJson = (definition) => CONTAINER_DEFINE_JSON_CONDITIONS.satisfy(definition);

const isContainerDefineJsons = (definitions) =>
    CONTAINER_DEFINE_JSONS_CONDITIONS.satisfy(definitions);

module.exports = {
    DEFAULT_CONTAINER_DFINE_JSONS, isContainerDefineJson, isContainerDefineJsons
}