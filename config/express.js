var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var expressValidator = require('express-validator');
var path = require('path');
var flash = require('connect-flash');
var helmet = require('helmet');
var session = require('express-session');
var globalFunctions = require(path.normalize(__dirname + '/../app/modules/GlobalFunctions.js'));
var globalConfigs = require(path.normalize(__dirname + '/global.js'));

module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';
  
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'ejs');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(helmet());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(expressValidator());
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());
  var sess = {
    secret: 'koineyadmin@secrettoken',
    cookie: {
      maxAge: 60 * 60 * 1000,
      sameSite: true
    },
    rolling: true,
    resave: true,
    saveUninitialized: true
  };

  if (env == 'production') {
    sess.cookie.secure = true;
    app.set('trust proxy', 1); // trust first proxy
  }
  //Session middleware
  app.use(session(sess));

  //Session Check
  function requireLOGIN(req, res, next) {
    var allowedRoutes = globalConfigs.allowedRoutes;
    if (req.url == '/') {
      next();
    } else if (req.url.split('/').length <= 2 && allowedRoutes.join("|").indexOf(req.url.split('/')[1]) > -1) {
      next();
    } else if (req.url.split('/').length > 2 && allowedRoutes.join("|").indexOf(req.url.split('/')[2]) > -1) {
      next();
    } else if (!req.session.admin && req.url.indexOf('login') === -1) {
      return res.redirect('/login');
    } else {
      next();
    }
  }
  app.use(requireLOGIN);
  //End Session Check
  app.use(flash());

  app.use(function (req, res, next) {
    if ('HEAD' == req.method || 'OPTIONS' == req.method) return next();
    // break session hash / force express to spit out a new cookie once per second at most
    req.session._garbage = Date();
    req.session.touch();
    app.locals.session = req.session;
    //app.locals.success_messages = req.flash('success_messages');
    app.locals.errors = req.flash('errors');
    next();
  })

  /* Global Functions throughout the controllers */
  global.globalFunctions = globalFunctions;
  //Set Global Config Variables inside views
  app.locals.imgUrl = '/img/';
  app.locals.constGlobals = globalConfigs;
  app.locals.dateFormat = globalFunctions.dateFormat;
  // app.locals.apiimageurl = 'http://localhost:9000/api/users/kyc'
  app.locals.addScripts = function (all) {
    app.locals.scripts = [];
    if (all != undefined) {
      return all.map(function (script) {
        return "<script src='/" + script + "'></script>";
      }).join('\n ');
    }
    else {
      return '';
    }
  };
  app.locals.addCss = function (all) {
    app.locals.css = [];
    if (all != undefined) {
      return all.map(function (css) {

        return "<link href='/" + css + "' rel='stylesheet' type='text/css' />";
      }).join('\n ');
    }
    else {
      return '';
    }
  };
  app.locals.getScripts = function (req, res) {
    return scripts;
  };
  
  app.use(function (req, res, next) {
    res.renderData = function (pageName, data, imgUrl) {
      return res.status(200).json({ "pageName": pageName, "data": data, "imgUrl": app.locals.imgUrl });
    };
    next();
  });
  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });
  
  /* app.use(function (req, res) {
    res.redirect("/login");
  }); */

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });

};
