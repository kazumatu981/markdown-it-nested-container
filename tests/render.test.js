const { describe, it } = require("mocha");
const { expect } = require("chai");
const { JSDOM } = require("jsdom");
const MarkdownIt = require('markdown-it');
const MarkdownItNestedContainer = require("../index.js");


describe('render test', () => {
    describe('normal render', () => {

        // [test data]
        const markdownText =
            ':::grid\n'
            + '+++grid-item\n'
            + 'item1\n'
            + '+++\n'
            + '+++grid-item[green]\n'
            + 'item2\n'
            + '+++\n'
            + '+++grid-item {"test":"abc"}\n'
            + 'item3\n'
            + '+++\n'
            + ':::';
        // [expected html]
        // <div class="grid">
        //     <div class="grid-item">
        //         <p>item1</p>
        //     </div>
        //     <div class="grid-item">
        //         <p>item2</p>
        //     </div>
        // </div>

        it('normal render', () => {
            const md = new MarkdownIt();
            md.use(MarkdownItNestedContainer);

            const html = md.render(markdownText);

            const dom = new JSDOM(html);
            const document = dom.window.document;
            const gridDivs = document.getElementsByClassName("grid");

            // div is className is `grid` must be only one.
            expect(gridDivs.length).to.be.equal(1);

            // the `grid` div must be root of document.
            const rootDiv = gridDivs[0];
            expect(document.body.firstChild.isSameNode(rootDiv)).to.true;

        })
        it('normal render', () => {
            const md = new MarkdownIt();
            md.use(MarkdownItNestedContainer);

            const html = md.render(markdownText);

            const dom = new JSDOM(html);
            const document = dom.window.document;
            const gridDiv = document.getElementsByClassName("grid")[0];

            // grid-item divs count 2.
            const gridItemDivs = document.getElementsByClassName("grid-item");
            expect(gridItemDivs.length).to.be.equal(3);

            // all grid-item's parent is root grid div.
            for (let idx = 0; idx < gridItemDivs.length; idx++) {
                const gridItemDiv = gridItemDivs[idx];
                expect(gridItemDiv.parentNode.isSameNode(gridDiv)).to.be.true;
            }

            // 2nd Element has green class.
            const greenItem = gridItemDivs[1];
            const className = greenItem.getAttribute("class");
            expect(className).to.includes("green");

            // 3rd Element has test attribute.
            const thirdItem = gridItemDivs[2];
            const attrValue= thirdItem.getAttribute("test");
            expect(attrValue).to.includes("abc");

        })

    });
})