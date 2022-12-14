module.exports = {
    "env": {
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "plugins": [
        "jsdoc"
    ],
    "extends": ["eslint:recommended", "standard", "plugin:jsdoc/recommended"],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "indent": ["error", 4],
        "semi": ["error", "always"],
        "space-before-function-paren": ["error", "never"],
        "no-extend-native": ["error", {
            "exceptions": ["Object", "Array"]
        }],
    }
}
