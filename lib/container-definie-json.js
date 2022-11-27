const { isClassName, usePrimitiveExtention } = require('./common');

usePrimitiveExtention();

const DEFAULT_CONTAINER_DFINE_JSONS = [
    {
        containerName: 'grid',
        marker: ':'
    },
    {
        containerName: 'grid-item',
        marker: '+'
    }
];

const CONTAINER_DEFINE_JSON_CONDITIONS = [
    (definition) => typeof definition === 'object',
    (definition) => definition.has('containerName'),
    (definition) => isClassName(definition.containerName),

    (definition) => definition.has('marker'),
    (definition) => typeof definition.marker === 'string',
    (definition) => definition.marker.length === 1,

    (definition) => !definition.has('validate') ||
        typeof definition.validate === 'function',
    (definition) => !definition.has('render') ||
        typeof definition.render === 'function'
];

const CONTAINER_DEFINE_JSONS_CONDITIONS = [
    (definitions) => Array.isArray(definitions),
    (definitions) => definitions.every(isContainerDefineJson),
    (definitions) => definitions.notToBeConflicted((x, y) => x.containerName === y.containerName),
    (definitions) => definitions.notToBeConflicted((x, y) => x.marker === y.marker)
];

/**
 * Test object to be ContainerDefineJson.
 *
 * @param {object} definition object which is expected to be ContainerDefineJson
 * @returns {boolean} result
 */
function isContainerDefineJson(definition) {
    return definition?.satisfyAll(CONTAINER_DEFINE_JSON_CONDITIONS) || false;
}

/**
 * Test object to be Array of ContainerDefineJson.
 *
 * @param {object} definitions object which is expected to be Array of ContainerDefineJson
 * @returns {boolean} result
 */
function isContainerDefineJsons(definitions) {
    return definitions?.satisfyAll(CONTAINER_DEFINE_JSONS_CONDITIONS) || false;
}

module.exports = {
    DEFAULT_CONTAINER_DFINE_JSONS, isContainerDefineJson, isContainerDefineJsons
};
