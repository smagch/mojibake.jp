const path = require("path");
const sass = require('sass');
const globalCSS = sass.compile(path.join(__dirname, '../src/styles/globals.scss')).css.toString();

module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: [
    '../src/**/*.stories.tsx',
  ],
  addons: [
    '@storybook/addon-actions',
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: {
            auto: true
          },
        },
      },
    },
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: false,
  },
  previewHead: (head) => (`
    ${head}
    <style>
      ${globalCSS}
    </style>
  `),
  webpackFinal: async (config) => {
    const pathToInlineSvg = path.resolve(__dirname, '../src/svg');
    const fileLoaderRule = config.module.rules.find(rule => rule.test.test('.svg'));
    fileLoaderRule.exclude = pathToInlineSvg;

    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, "../src"),
    ];

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
