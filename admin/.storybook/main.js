module.exports = {
  "stories": [
    "../resources/js/stories/**/*.stories.mdx",
    "../resources/js/stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "core": {
    "builder": "webpack5"
  }
}
