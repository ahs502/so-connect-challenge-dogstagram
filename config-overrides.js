const SentryPlugin = require('@sentry/webpack-plugin')
const {
  addBabelPlugins,
  addWebpackAlias,
  addWebpackPlugin,
  addWebpackResolve,
  babelInclude,
  disableEsLint,
  removeModuleScopePlugin,
  override,
  setWebpackStats,
} = require('customize-cra')
const path = require('path')
const { ProvidePlugin } = require('webpack')
const WorkBoxPlugin = require('workbox-webpack-plugin')

const aliases = {
  shared: path.resolve(__dirname, '..', 'shared'),
  extension: path.resolve(__dirname, '..', 'extension', 'src', 'types'),
}

const targetEnvironment = process.env.TARGET_ENV || 'local'
const agentEnvironment = process.env.AGENT_ENV || 'browser'

// TODO: Do we need this, since we're not actually using dexie-react-hooks?
// Currently, CRA doesn't support MJS, which is required by dexie-react-hooks:
function supportMjs() {
  return webpackConfig => {
    webpackConfig.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    })
    return webpackConfig
  }
}

module.exports = {
  webpack: override(
    disableEsLint(),
    removeModuleScopePlugin(),
    addBabelPlugins('@babel/plugin-proposal-optional-chaining', '@babel/plugin-proposal-nullish-coalescing-operator'),
    babelInclude(Object.values(aliases).concat(path.resolve(__dirname, 'src'))),
    addWebpackAlias(aliases),
    addWebpackPlugin(require('./defineWebpackPlugin')()),
    setWebpackStats({ warningsFilter: [/Failed to parse source map/] }),
    addWebpackResolve({
      fallback: {
        assert: require.resolve('assert/'),
        crypto: require.resolve('crypto-browserify/'),
        http: require.resolve('stream-http/'),
        https: require.resolve('https-browserify/'),
        os: require.resolve('os-browserify/browser'),
        stream: require.resolve('stream-browserify/'),
        url: require.resolve('url/'),
        util: require.resolve('util/'),
      },
    }),
    addWebpackPlugin(
      new ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      })
    ),
    config => {
      config.plugins?.forEach(plugin => {
        if (plugin instanceof WorkBoxPlugin.InjectManifest) {
          plugin.config.maximumFileSizeToCacheInBytes = 10 * 1024 * 1024 // By default it is 5MB, so the large bundled JS files are not precached; think of a better solution for that problem
        }
      })
      return config
    },
    false && // TODO: This plugin won't work correctly with our two-step build approach, fix it, then activate it again:
      targetEnvironment !== 'local' &&
      addWebpackPlugin(
        new SentryPlugin({
          release: `${require('./package.json').version}-${
            process.env.NODE_ENV
          }-${targetEnvironment}-${agentEnvironment}`,
          include: './dist',
        })
      ),
    supportMjs()
  ),
  devServer(configFunction) {
    return (proxy, allowedHost) => {
      const config = configFunction(proxy, allowedHost)
      config.static = [].concat(config.static).concat({
        directory: config.static.directory.slice(0, -6) + 'temp',
        publicPath: ['/'],
      })
      return config
    }
  },
}
