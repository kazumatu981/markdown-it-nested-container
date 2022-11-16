
function isClassName(test) {
    const classNameFound = /^[A-Za-z0-9]+(-?[A-Za-z0-9]+)*$/.exec(test);
    return classNameFound != null;
}

function usePrimitiveExtention() {
    Array.prototype.satisfy = function (test) {
        return this.every(condition => condition(test));
    }

    Array.prototype.notConflict = function (equals) {
        return this.every(
            (item1) => this.filter((item2) => equals(item1, item2)).length == 1)
    }
}
module.exports = {
    isClassName, usePrimitiveExtention
}