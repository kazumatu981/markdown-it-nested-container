import { describe, it } from "mocha";
import { expect } from "chai";
import { DEFAULT_CONTAINER_DFINITIONS, validateContainerDefinitions } from "../../lib/container-definition.js";

describe('[module test]: container-definitions', () => {
    describe('safeContainerDefinitions()', () => { });
    describe('validateContainerDefinitions()', () => {
        it('default is not throw', () => {
            const test = DEFAULT_CONTAINER_DFINITIONS;

            const actual = validateContainerDefinitions(test);

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
            const actual = validateContainerDefinitions(test);

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
            const actual = validateContainerDefinitions(test);

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
            const actual = validateContainerDefinitions(test);

            expect(actual).to.equal(test);
        });
    })
})