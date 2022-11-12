import { describe, it } from "mocha";
import { JSDOM } from "jsdom";
import { expect } from "chai";
import MarkdownIt from 'markdown-it';
import MarkdownItNestedContainer from "../index.js";


describe('render test', () => {
    describe('normal render', () => {

        // [test data]
        const markdownText =
            ':::grid\n'
            + '+++grid-item\n'
            + 'item1\n'
            + '+++\n'
            + '+++grid-item\n'
            + 'item2\n'
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
            expect(gridItemDivs.length).to.be.equal(2);

            // all grid-item's parent is root grid div.
            for (let idx = 0; idx < gridItemDivs.length; idx++) {
                const gridItemDiv = gridItemDivs[idx];
                expect(gridItemDiv.parentNode.isSameNode(gridDiv)).to.be.true;
            }
        })

    });
})