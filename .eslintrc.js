module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/typescript/recommended",
        "plugin:prettier/recommended"
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "max-len": ["error", { code: 360 }],
        "no-unused-vars": [
            1,
            {
                ignoreRestSiblings: false
            }
        ],
        "prettier/prettier": [
            2,
            {
                bracketSpacing: true, // Print spaces between brackets in object literals. example: { foo: bar }
                printWidth: 120, // the number of characters per line is limited to 120 ch
                singleQuote: false, // Prevents single quotes, now is rule use double quotes
                trailingComma: "none", // use of commas when required.
                tabWidth: 4, // Adds 4 spaces on use tab
                useTabs: false, // Prevents tab from being used and adds 4 spaces
                arrowParens: "always", // parentheses are required when using arrow functions
                semi: true, // semicolon at the end of each statement
                endOfLine: "lf", // default line break for linux and derivatives
                vueIndentScriptAndStyle: false // avoid bleeding
            }
        ]
    },
    overrides: [
        {
            files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
            env: {
                jest: true
            }
        }
    ]
};
