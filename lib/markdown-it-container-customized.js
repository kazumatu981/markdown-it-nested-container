const MarkdownItContainer = require('markdown-it-container');

class MarkdownItContainerCustomized {
    constructor(md, containerDefineJson) {
        this._md = md;
        this._containerName = containerDefineJson.containerName;
        this._marker = containerDefineJson.marker;
        this._validate = containerDefineJson.validate;
        this._render = containerDefineJson.render;
        this._core = MarkdownItContainer;
    }
    get containerName() {
        return this._containerName;
    }
    get marker() {
        return this._marker;
    }
    get validate() {
        return this._validate ?? ((params) => this._validateDefault(params));
    }
    get render() {
        return this._render
            ?? ((tokens, idx, _options, env, slf) => this._renderDefault(tokens, idx, _options, env, slf));
    }
    use() {
        this._core(this._md, this._containerName, {
            marker: this.marker,
            validate: this.validate,
            render: this.render
        });
        return this;
    }

    _validateDefault(info/*, markup*/) {
        return this.containerName === MarkdownItContainerCustomized._readContainerName(info);
    }

    _renderDefault(tokens, idx, _options, env, slf) {

        // add a class to the opening tag
        if (tokens[idx].nesting === 1) {
            const info = tokens[idx].info;
            tokens[idx].attrJoin('class', this.containerName);

            // add classes
            MarkdownItContainerCustomized._readExtendsClasses(info)
                .forEach(className => {
                    tokens[idx].attrJoin('class', className);
                });

            // add attributes
            const attributes = MarkdownItContainerCustomized._readAttributes(info);
            Object.keys(attributes)
                .forEach(key => {
                    const value = attributes[key];
                    tokens[idx].attrJoin(key, value);
                });
        }

        return slf.renderToken(tokens, idx, _options, env, slf);
    }

    static _readContainerName(info) {
        if (!info) return '';

        return info.trim().split(/[\s|\{|\[]/)[0];
    }

    static _readExtendsClasses(info) {
        if (!info) return [];

        let classes = [];
        const found = /\[.*?\]/.exec(info)

        if (found) {
            classes = found[0]
                .replace('[', '')
                .replace(']', '')
                .split(/[\s+|\s*,\s*]/)
                .filter(item => item !== "")
        }

        return classes;
    }

    static _readAttributes(info) {
        if (!info) return {};

        let attributes = {};
        const found = /\{.*?\}/.exec(info);

        if (found) {
            try {
                attributes = JSON.parse(found[0]);
            } catch (ex) {
                if (ex instanceof SyntaxError) {
                    attributes = {};
                } else {
                    throw ex;
                }
            }
        }

        return attributes;
    }
}

module.exports = {
    MarkdownItContainerCustomized,
}
