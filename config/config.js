var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'testmongo'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/testmongo-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'testmongo'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/testmongo-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'testmongo'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/testmongo-production'
  }
};

module.exports = config[env];
