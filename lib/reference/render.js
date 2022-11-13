function validateDefault(params/*, markup*/) {
    return params.trim().split(' ', 2)[0] === name;
}

function renderDefault(tokens, idx, _options, env, slf) {

    // add a class to the opening tag
    if (tokens[idx].nesting === 1) {
        tokens[idx].attrJoin('class', name);
    }

    return slf.renderToken(tokens, idx, _options, env, slf);
}
function readLanguageAndAltText(info) {
    if (!info) return { language: '', alt: '' };

    const trimed = info.trim();
    const langFound = /[\s|\[]/.exec(trimed);
    const altFound = /\[.*?\]/.exec(trimed);

    return {
        language: langFound ?
            trimed.substring(0, langFound.index) : trimed,
        alt: altFound ?
            altFound[0].replace('[', '').replace(']', '') : ''
    };
}
