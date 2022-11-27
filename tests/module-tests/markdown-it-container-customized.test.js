const { describe, it } = require('mocha');
const { expect } = require('chai');

const { DEFAULT_CONTAINER_DFINE_JSONS } = require('../../lib/container-definie-json');
const { MarkdownItContainerCustomized } = require('../../lib/markdown-it-container-customized');

describe('[module test]: markdown-it-container-customized.js', () => {
    describe('private methods:', () => {
        describe('_readContainerName()', () => {
            [
                {
                    test: "abc",
                    expected: "abc"
                },
                {
                    test: "abc ",
                    expected: "abc"
                },
                {
                    test: "abc    ",
                    expected: "abc"
                },
                {
                    test: "     abc    ",
                    expected: "abc"
                },
                {
                    test: "abc[abc,aaa]",
                    expected: "abc"
                },
                {
                    test: "abc[abc aaa]",
                    expected: "abc"
                },
                {
                    test: "abc{x:1,y:'abc'}",
                    expected: "abc"
                },
                {
                    test: "",
                    expected: ""
                },
                {
                    test: null,
                    expected: ""
                },
            ].forEach(testCase => {
                it(`testCase: ${testCase.test}, expected: ${testCase.expected}`, () => {
                    const actual = MarkdownItContainerCustomized._readContainerName(testCase.test);
                    expect(actual).to.be.equal(testCase.expected);
                })
            })
        });
        describe('_readExtendsClasses()', () => {
            [
                {
                    test: "abc",
                    expected: []
                },
                {
                    test: "abc    ",
                    expected: []
                },
                {
                    test: "     abc    ",
                    expected: []
                },
                {
                    test: "abc[xx,yy]",
                    expected: ["xx", "yy"]
                },
                {
                    test: "abc[xx, yy]",
                    expected: ["xx", "yy"]
                },
                {
                    test: "abc[xx , yy]",
                    expected: ["xx", "yy"]
                },
                {
                    test: "abc[xx y]",
                    expected: ["xx", "y"]
                },
            ].forEach(testCase => {
                it(`testCase: ${testCase.test}, expected: ${testCase.expected}`, () => {
                    const actual = MarkdownItContainerCustomized._readExtendsClasses(testCase.test);

                    expect(actual.length).to.be.equal(testCase.expected.length);
                    actual.forEach((item, idx) => {
                        expect(item).to.be.equal(testCase.expected[idx]);
                    })
                })
            })
        });
        describe('_readExtendsClasses()', () => {
            [
                {
                    test: "abc",
                    expected: {}
                },
                {
                    test: "abc    ",
                    expected: {}
                },
                {
                    test: "     abc    ",
                    expected: {}
                },
                {
                    test: 'abc[abc,def]',
                    expected: {}
                },
                {
                    test: 'abc{"xx":1,"yy":"abc"}',
                    expected: { xx: 1, "yy": "abc" }
                },
                {
                    test: 'abc{ "xx":1,    "yy":"abc" }',
                    expected: { xx: 1, "yy": "abc" }
                },
                {
                    test: 'abc{ "xx":true,    "yy":"abc" }',
                    expected: { xx: true, "yy": "abc" }
                },
                {
                    test: 'abc{ "xx":true,    "yy":abc }',
                    expected: {}
                },
            ].forEach(testCase => {
                it(`testCase: ${testCase.test}, expected: ${JSON.stringify(testCase.expected)}`, () => {
                    const actual = MarkdownItContainerCustomized._readAttributes(testCase.test);

                    expect(Object.keys(actual).length).to.be.equal(Object.keys(testCase.expected).length);
                    Object.keys(actual).forEach((key) => {
                        expect(actual[key]).to.be.equal(testCase.expected[key]);
                    })
                })
            })
        })

    })
});