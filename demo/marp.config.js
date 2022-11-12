
// module.exports = {
//     inputDir: './',
//     engine: ({ marp }) => marp.use(require('../index'))
// }

import MarkdownItNestedContainer from "../index.js";

export const inputDir = './'
export function engine({ marp }) {
    return marp.use(MarkdownItNestedContainer);
}