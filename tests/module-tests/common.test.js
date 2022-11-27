const { describe, it } = require('mocha');
const { expect } = require('chai');
const { isClassName, usePrimitiveExtention } = require('../../lib/common.js');

usePrimitiveExtention();

describe('common.js tests', () => {
    describe('isClassName()', () => {
        [
            { test: "abc", expected: true },
            { test: "grid", expected: true },
            { test: "grid-item", expected: true },
            { test: undefined, expected: false },
            { test: 1, expected: false },
            { test: "", expected: false },
            { test: "   ", expected: false },
            { test: "--item", expected: false },
            { test: "-", expected: false },
            { test: "test_test", expected: false },
        ].forEach(testCase => {
            it(`testCase: ${testCase.test}, expected: ${testCase.expected}`, () => {
                const actual = isClassName(testCase.test);
                expect(actual).to.equal(testCase.expected);
            })
        })

    });
    describe('satisfyAll()', () => {
        [
            {
                name: 'normal case',
                test: {
                    x: 1,
                    y: "abc"
                },
                conditions: [
                    o => o.has('x'),
                    o => typeof o["x"] == 'number'
                ],
                expected: true
            },
            {
                name: 'exists unsatisfy condition',
                test: {
                    x: 1,
                    y: "abc"
                },
                conditions: [
                    o => o.has('x'),
                    o => typeof o["y"] == 'number'
                ],
                expected: false
            },
        ].forEach(testCase => {
            it(`${testCase.name}`, () => {
                const actual = testCase.test.satisfyAll(testCase.conditions);
                expect(actual).to.be.equal(testCase.expected);
            });
        })
    });
    describe('has()', () => {
        [
            {
                test: { x: 1, y: 2 },
                propName: 'x',
                expected: true
            },
            {
                test: { x: 1, y: 2 },
                propName: 'z',
                expected: false
            },
            {
                test: { x: 1, y: 2, z: undefined },
                propName: 'z',
                expected: false
            },
            {
                test: { x: 1, y: 2, z: null },
                propName: 'z',
                expected: false
            },
        ].forEach(testCase => {
            it(`test: ${JSON.stringify(testCase.test)}; prop: ${testCase.propName}; expected: ${testCase.expected}`, () => {
                const actual = testCase.test.has(testCase.propName);
                expect(actual).to.be.equal(testCase.expected);
            })
        })
    });
    describe('notToBeConflicted()', () => {
        [
            {
                test: [1, 2, 3],
                expected: true,
                equal: (x, y) => x == y
            },
            {
                test: [1, 2, 2],
                expected: false
            },
            {
                test: [1, 1, 3],
                expected: false
            },
            {
                test: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }],
                expected: true,
                equal: (x1, x2) => x1.x == x2.x
            },
            {
                test: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }],
                expected: false,
                equal: (x1, x2) => x1.x == x2.x
            },
        ].forEach(testCase => {
            it(`testCase: [${JSON.stringify(testCase.test)}]; expected: ${testCase.expected}; equal: ${testCase.equal?.toString()}`, () => {
                let actual = testCase.test.notToBeConflicted(testCase.equal);
                expect(actual).to.be.equal(testCase.expected);
            })

        });
    })
});