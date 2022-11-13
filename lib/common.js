
function isClassName(test) {
    const classNameFound = /^[A-Za-z0-9]+(-?[A-Za-z0-9]+)*$/.exec(test);
    return classNameFound != null;
}

module.exports = {
    isClassName
}