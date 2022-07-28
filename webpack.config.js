const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CleanWebpackPlugin = require('clean-webpack-plugin');

const resolveCWD = (target) => {
  return path.resolve(process.cwd(), target);
};

const whenProd = (yesVal, noVal) => {
  return process.env.ENV === "production" ? yesVal : noVal;
};

const whenSPA = (yesVal, noVal) => {
  return process.env.TYPE === "SPA" ? yesVal : noVal;
};

const config = {
  mode: whenProd("production", "development"),
  entry: whenSPA(resolveCWD("./src/spa/index.jsx"), {
    entryHome: "./src/mpa/entryHome.jsx",
    entryProfile: "./src/mpa/entryProfile.jsx",
    entryAbout: "./src/mpa/entryAbout.jsx",
  }),
  output: whenSPA(
    {
      path: resolveCWD("./dist"),
      filename: "spa/[name]-[contenthash:8].js",
      chunkFilename: "spa/static/js/[name]-[contenthash:8].js",
      publicPath: "/",
      clean: true
    },
    {
      path: resolveCWD("./dist"),
      filename: "mpa/[name]-[contenthash:8].js",
      chunkFilename: "mpa/static/js/[name]-[contenthash:8].js",
      publicPath: "/",
      clean: true
    }
  ),
  resolve: {
    extensions: [".ts", ".tsx", ".jsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        loader: "esbuild-loader",
        options: {
          loader: "jsx",
          target: "es2015",
        },
      },
    ],
  },
  plugins: [
    // new CleanWebpackPlugin(),
    ...whenSPA(
      [new HtmlWebpackPlugin({
        inject: true,
        template: resolveCWD("./public/spa/index.html"),
        filename: "spa/index.html",
      })],
      [
        new HtmlWebpackPlugin({
          inject: true,
          template: resolveCWD("./public/mpa/index.html"),
          filename: "index.html",
          chunks: ["entryHome"],
        }),
        new HtmlWebpackPlugin({
          inject: true,
          template: resolveCWD("./public/mpa/about.html"),
          filename: "about.html",
          chunks: ["entryAbout"],
        }),
        new HtmlWebpackPlugin({
          inject: true,
          template: resolveCWD("./public/mpa/profile.html"),
          filename: "profile.html",
          chunks: ["entryProfile"],
        }),
      ]
    ),
  ],
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: "all",
      minSize: 1000,
      maxSize: 10000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 1,
          priority: -10,
        },
      },
    },
  },
  devServer: {
    historyApiFallback: whenSPA(true, {
      rewrites: [
        { from: /^\/$/, to: "/index.html" },
        { from: /^\/about/, to: "/about.html" },
        { from: /^\/profile/, to: "/profile.html" },
        { from: /./, to: "/views/404.html" },
      ],
    }),
    open: whenSPA(["/basename"], ["/"]),
    static: {
      directory: whenSPA(
        resolveCWD("./public/spa"),
        resolveCWD("./public/mpa")
      ),
      publicPath: "/",
    },
  },
};
debugger
 module.exports = config;
