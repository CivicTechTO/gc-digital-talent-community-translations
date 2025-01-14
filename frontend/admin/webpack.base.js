const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TsTransformer = require("@formatjs/ts-transformer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HydrogenPlugin = require("hydrogen-webpack-plugin");
const { DefinePlugin } = require("webpack");
require('dotenv').config({ path: './.env' });
const shell = require("shelljs");
const fs = require("fs");

module.exports = {
  entry: {
    app: [
      "./src/js/main.tsx",
      path.resolve(__dirname, "../common/src/css/hydrogen.css"),
      "../common/src/css/common.css",
      "./src/css/app.css",
    ],
  },
  plugins: [
    // Run Hydrogen on Webpack's compiler hooks
    new HydrogenPlugin({ outputFile: path.resolve(__dirname, "../common/src/css/hydrogen.css") }),

    // process and copy CSS files
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),

    // plain copy files to target folder
    new CopyPlugin({
      patterns: [
        {
          context: "public/",
          from: "**/*",
          globOptions: {
            dot: true,
            ignore: ["**/public/index.html", "**/.DS_Store", "**/public/config.ejs"],
          },
        },
      ],
    }),

    // search and replace environment variables
    new DefinePlugin({
      "process.env": {
        API_URI: JSON.stringify(process.env.API_URI),
        ADMIN_APP_URL: JSON.stringify(process.env.ADMIN_APP_URL),
        ADMIN_APP_DIR: JSON.stringify(process.env.ADMIN_APP_DIR),
        BUILD_DATE: JSON.stringify(new Date()),
      },
    }),

    // generate an index.html file based on given template
    new HtmlWebpackPlugin({
      title: "Admin",
      template: path.resolve(__dirname, "public/index.html"),
    }),

    // generate an config file with the environment variables (not actually HTML but it's handy to reuse the plugin)
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/config.ejs"),
      filename: "config.js",
      inject: false,
      environment: process.env,
      minify: false, // minify in production causes this to fail
    }),

    // run some checks before compilation begins
    {
      apply: (compiler) => {
        compiler.hooks.compile.tap("Preflight check", () => {
          const authVariables = [
            "OAUTH_URI", "OAUTH_TOKEN_URI", "OAUTH_ADMIN_CLIENT_ID", "OAUTH_ADMIN_CLIENT_SECRET"
          ];
          if (authVariables.some((v) => process.env.hasOwnProperty(v)))
            throw 'OAUTH variables should be defined in the api project, not the admin project.  Compare the .env file to the .env.example for proper use.  https://github.com/GCTC-NTGC/gc-digital-talent/pull/2220';
        });
      },
    },
  ],
  module: {
    rules: [
      {
        // transpile typescript files
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              "filename": ".babelrc"
            },
          },
          {
            loader: "ts-loader",
            options: {
              getCustomTransformers() {
                return {
                  before: [
                    // formatjs transformer for intl strings
                    TsTransformer.transform({
                      overrideIdFn: "[sha512:contenthash:base64:6]",
                    }),
                  ],
                };
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        // load css files
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  /**
   * Optimizations only run in production mode
   *
   * Ref: https://webpack.js.org/configuration/optimization/
   */
  optimization: {
    minimizer: [
      `...`, // Includes default minimizers
      new CssMinimizerPlugin(),
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      // resolver for shared common project
      "@common": path.resolve(__dirname, "../common/src"),
    },
  },
  output: {
    publicPath: "/admin/", // final path for routing
    filename: "[name].[contenthash].js", // file hashing for cache busting
    chunkFilename: "[name].[contenthash].js", // file hashing for cache busting
    path: path.resolve(__dirname, "dist"), // output folder
    clean: true, // delete existing files on recompile
  },
};
