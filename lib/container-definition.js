const DEFAULT_CONTAINER_DFINITION_JSONS = [
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

class ContainerDefinition {
    constructor(containerDefinitionJson) {
        this._containerName = containerDefinitionJson.containerName;
        this._marker = containerDefinitionJson.options.marker;
        this._validate = containerDefinitionJson.options?.validate;
        if (!this._validate) {
            this._validate = (params) => this.validateDefault(params);
        }

        this._render = containerDefinitionJson.options?.render;
        if (!this._render) {
            this._render = (tokens, idx, _options, env, slf) => {
                return this.renderDefault(tokens, idx, _options, env, slf);
            }
        }
    }
    get containerName() {
        return this._containerName;
    }
    get options() {
        return {
            marker: this._marker,
            validate: this._validate,
            render: this._render
        }
    }

    validateDefault(info/*, markup*/) {
        const containerClasses = this.readClasses(info);
        return containerClasses.containerName === this.containerName;
    }

    renderDefault(tokens, idx, _options, env, slf) {

        // add a class to the opening tag
        if (tokens[idx].nesting === 1) {
            const info = tokens[idx].info;
            const containerClasses = this.readClasses(info);
            let classes = this.containerName;
            if (containerClasses.classes) {

                classes += ' ' + containerClasses.classes;
            }

            tokens[idx].attrJoin('class', classes);
        }

        return slf.renderToken(tokens, idx, _options, env, slf);
    }
    readClasses(info) {
        if (!info) return { containerName: '', classes: '' };

        const trimed = info.trim();
        const containerNameFound = /[\s|\[]/.exec(trimed);

        let containerName = trimed;
        if (containerNameFound) {
            containerName = trimed.substring(0, containerNameFound.index)
        }
        const classesFound = /\[.*?\]/.exec(trimed);
        let classes = '';
        if (classesFound) {
            classes = classesFound[0].replace('[', '').replace(']', '')
                .split(/\s+/)
                .join(' ');
        }

        return {
            containerName, classes
        };
    }

}
function safeGetContainerDefinitions(definitionJsons) {
    return definitionJsons == undefined ?
        DEFAULT_CONTAINER_DFINITION_JSONS : validateContainerDefinitionJsons(definitionJsons);
}
function validateContainerDefinitionJsons(definitions) {
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
    return ((_a = /^[A-Za-z0-9]+(-?[A-Za-z0-9]+)*$/.exec(test)) === null || _a === void 0 ? 0 : _a.length) != 0;
}
const DEFINITION_CONDITIONS = [
    (definition) => isClassName(definition.containerName),
    (definition) => definition.options.marker.length == 1
];

module.exports = {
    ContainerDefinition,
    DEFAULT_CONTAINER_DFINITION_JSONS, safeGetContainerDefinitions, validateContainerDefinitionJsons
}
