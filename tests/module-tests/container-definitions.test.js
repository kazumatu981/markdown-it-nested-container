const { describe, it } = require("mocha");
const { expect } = require("chai");
const { DEFAULT_CONTAINER_DFINITION_JSONS, validateContainerDefinitionJsons } = require("../../lib/container-definition.js");

describe('[module test]: container-definitions', () => {
    describe('safeContainerDefinitions()', () => { });
    describe('validateContainerDefinitions()', () => {
        it('default is not throw', () => {
            const test = DEFAULT_CONTAINER_DFINITION_JSONS;

            const actual = validateContainerDefinitionJsons(test);

            expect(actual).to.equal(test);
        });
        it('full-fill definition must return it-self.', () => {
            const test = [
                {
                    containerName: 'grid',
                    options: {
                        marker: ':',
                        render: () => { },
                        validate: () => { }
                    }
                }
            ];
            const actual = validateContainerDefinitionJsons(test);

            expect(actual).to.equal(test);
        });
        it('can abbreve render', () => {
            const test = [
                {
                    containerName: 'grid',
                    options: {
                        marker: ':',
                        validate: () => { }
                    }
                }
            ];
            const actual = validateContainerDefinitionJsons(test);

            expect(actual).to.equal(test);
        })
        it('can abbreve validate', () => {
            const test = [
                {
                    containerName: 'grid',
                    options: {
                        marker: ':',
                        render: () => { },
                    }
                }
            ];
            const actual = validateContainerDefinitionJsons(test);

            expect(actual).to.equal(test);
        });
    })
})