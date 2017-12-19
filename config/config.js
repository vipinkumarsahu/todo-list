var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'Koiney-Admin'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/koiney-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'Koiney-Admin'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/koiney-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'Koiney-Admin'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/koiney-production'
  }
};

module.exports = config[env];
