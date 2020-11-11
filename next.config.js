module.exports = {
  webpack: (config, {isServer}) => {
    // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: 'empty',
        pref: 'empty',
      }

    return config
  }
}
