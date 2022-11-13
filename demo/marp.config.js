
module.exports = {
    inputDir: './',
    engine: ({ marp }) => marp.use(require('../index'))
}
