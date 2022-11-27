const { MarkdownItContainerCustomized } = require('./markdown-it-container-customized.js');
const { DEFAULT_CONTAINER_DFINE_JSONS, isContainerDefineJsons } = require('./container-definie-json');

function MarkdownItNestedContainer(md, options) {
    const defineJsons = options ?? DEFAULT_CONTAINER_DFINE_JSONS;
    if (isContainerDefineJsons(defineJsons)) {
        defineJsons.forEach((defineJson) => {
            const customized = new MarkdownItContainerCustomized(md, defineJson);
            customized.use();
        });
    } else {
        throw new Error('option invalid.');
    }
}

module.exports = {
    MarkdownItNestedContainer
};
