const { describe, it } = require('mocha');
const { expect } = require('chai');
const { isClassName, usePrimitiveExtention } = require('../../lib/common.js');

usePrimitiveExtention();

describe('common.js tests', () => {
    describe('isClassName()', () => {

    });
    describe('satisfy()', () => {

    });
    describe('notConflict()', () => {
        const testCases = [
            {
                test: [1, 2, 3],
                expected: true
            },
            {
                test: [1, 2, 2],
                expected: false
            },
            {
                test: [1, 1, 3],
                expected: false
            }
        ];
        testCases.forEach(testCase => {
            it(`testCase: [${testCase.test}]; expected: ${testCase.expected}`, () => {
                let actual = testCase.test.notConflict((x, y) => x == y);
                expect(actual).to.be.equal(testCase.expected);
            })

        });
    })
});