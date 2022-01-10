const path = require("path");
const sass = require('sass');
const globalCSS = sass.compile(path.join(__dirname, '../src/styles/globals.scss')).css.toString();

module.exports = {
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
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, "../src"),
    ];
    config.module.rules.unshift({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: {
                removeViewBox: false,
              },
            },
          },
        },
        "url-loader",
      ],
    });

    return config;
  },
};
