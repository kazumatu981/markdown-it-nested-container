const { safeGetContainerDefinitions, ContainerDefinition } = require('./container-definition.js');
const MarkdownItContainer = require('markdown-it-container');
const { DEFAULT_CONTAINER_DFINE_JSONS, isContainerDefineJson, isContainerDefineJsons } = require('./container-definie-json')


function MarkdownItNestedContainer(md, options) {
    const defineJsons = options ?? DEFAULT_CONTAINER_DFINE_JSONS;
    if (isContainerDefineJsons(defineJsons)) {
        defineJsons.forEach((defineJson) => {
            const difinition = new ContainerDefinition(defineJson);
            MarkdownItContainer(md, difinition.containerName, difinition.options);
        });
    } else {
        throw new Error('option invalid.')
    }
}

module.exports = {
    MarkdownItNestedContainer
}