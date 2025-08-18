module.exports = {
    extends: [require.resolve("@shared/eslint/package")],
    rules: {
        "no-console": "off",
        "jsdoc/require-returns": "off",
        "jsdoc/match-description": "off",
        "jsdoc/require-description": "off",
        "jsdoc/require-param-description": "off",
    },
};
