const environment = require('./environment')

config = environment.toWebpackConfig()
config.node = { fs: 'empty' };
module.exports = config;
