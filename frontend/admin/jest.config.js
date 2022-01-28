module.exports = {
  globals: {
    "ts-jest": {
      astTransformers: {
        before: [
          {
            path: "@formatjs/ts-transformer/ts-jest-integration",
            options: {
              // options
              overrideIdFn: "[sha512:contenthash:base64:6]",
              ast: true,
            },
          },
        ],
      },
    },
  },
  roots: ["resources/js", "tests"],
  // https://alexjover.com/blog/enhance-jest-configuration-with-module-aliases/
  moduleNameMapper: {
    "@common(.*)$": "<rootDir>/../common/src/$1",
    "^.+\\.(css|less)$": "<rootDir>/resources/js/tests/config/CSSStub.js",
  },
  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  collectCoverage: true,
  coverageReporters: ["json", "html"],
  collectCoverageFrom: [
    "resources/js/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/node_modules/",
  ],
  coverageDirectory: "resources/js/tests/coverage",

  // Module file extensions for importing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
