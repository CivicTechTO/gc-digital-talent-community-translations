const path = require("path");
const TsTransformer = require("@formatjs/ts-transformer");
const transform = TsTransformer.transform;
// This uses ts-loader to inject generated ids into react-intl messages.
const reactIntlTransformRule = {
  test: /\.tsx?$/,
  loader: "ts-loader",
  options: {
    getCustomTransformers() {
      return {
        before: [
          transform({
            overrideIdFn: "[sha512:contenthash:base64:6]",
          }),
        ],
      };
    },
  },
  exclude: /node_modules/,
};

module.exports = {
  "staticDirs": ['../public'],
  "stories": [
    "../resources/js/stories/**/*.stories.mdx",
    "../resources/js/stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-intl"
  ],
  "core": {
    "builder": "webpack5"
  },
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    config.resolve.alias = {
        ...config.resolve.alias,
        "react": path.resolve('./node_modules/react'),
        "react-dom": path.resolve('./node_modules/react-dom'),
        "react-hook-form": path.resolve('./node_modules/react-hook-form'),
        "react-intl": path.resolve("./node_modules/react-intl"),
        "@common": path.resolve('../common/src'),
    }

    config.module.rules = [
      ...config.module.rules,
      reactIntlTransformRule,
    ];

    return config;
  },
}
