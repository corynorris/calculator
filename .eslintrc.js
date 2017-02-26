module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "env": {
        "mocha": true
    },
    "rules": {
        // Disable `no-console` rule
        "no-console": 0,
        "indent": ["error", 2],
        "arrow-parens": ["error", "always", {
            "requireForBlockBody": true,
        }]
    }
};

