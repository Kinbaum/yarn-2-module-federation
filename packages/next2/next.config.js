const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;
const path = require("path");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    const mfConf = {
      name: "next2",
      library: { type: config.output.libraryTarget, name: "next2" },
      filename: "static/runtime/remoteEntry.js",
      remotes: {},
      exposes: {
        "./nav": "./components/nav",
      },
      shared: {},
    };

    if (!isServer) {
      config.output.publicPath = "http://localhost:3001/_next/";
      config.output.library = "next2";
      // shouldnt have to do this
      config.plugins.push(
        new webpack.ProvidePlugin({
          React: "react",
        })
      );
      // shouldnt have to do this
      Object.assign(config.resolve.alias, {
        react: path.resolve(__dirname, "./react.js"),
      });

      /**
       * Look here:
       * I don't want to always have to specify my remotes in my webpack config
       */

      //   Object.assign(mfConf, {
      //     remotes: {
      //       next1: "next1",
      //     },
      //   });
    } else {
      // is server

      /**
       * Look here:
       * I don't want to always have to specify my remotes in my webpack config
       */

      //   Object.assign(mfConf, {
      //     remotes: {
      //       next1: path.resolve(
      //         __dirname,
      //         "../next1/.next/server/static/runtime/remoteEntry.js"
      //       ),
      //     },
      //   });

      // shouldnt have to do this
      config.externals = {
        react: require.resolve("./react.js"),
      };
    }

    config.plugins.push(new ModuleFederationPlugin(mfConf));

    return config;
  },
  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};
