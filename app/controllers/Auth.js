// Auth.js

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    Admin = require(path.normalize(__dirname + '/../models/AdminModel')),
    validator = require(path.normalize(__dirname + '/../validators/loginValidator'));

module.exports = function (app) {
    app.use('/', router);
};

//Login Get Function
router.get(['/login','/'], function (req, res, next) {
    /*  var newUser = Admin({
    name: 'Admin',
    email: 'vipin18sahu@gmail.com',
    password: '123456'
  });

  // save the user
  newUser.save(function (err) {
    if (err) throw err;

    console.log('User created!');
  });  */
    res.render('login', {
        title: 'KoineyAdmin',
        loginType: 'admin',
        loginAction: '/login',
    });
});

//login post function
router.post('/login', function (req, res, next) {
    req.checkBody(validator.login);

    var errors = req.validationErrors();
    if (errors) {
        res.render('login', {
            title: 'KoineyAdmin',
            loginType: 'superAdmin',
            loginAction: '/login',
            errors: errors
        });
        return;
    } else {
        var errors = [];
        var keepSignIn = req.body.keepSignIn;
        if (keepSignIn == '1') {
            //code to set session from cookie data
        }
        var password = req.body.password;
        Admin.findOne({ email: req.body.email })
             .populate('role')
             .exec(function (err, data) {
            if (err) {
                res.send(err);
            } else if (!data) {
                req.flash('errors', [{
                    msg: "Invalid username"
                }]);
                res.redirect('/login');
            } else {

                data = data.toObject();
                if (globalFunctions.checkPassword(req.body.password, data.password) /* && data.status != '0'*/) {
                    delete data.password;
                    req.session.admin = data;
                    if (data.type == 0) {
                        req.session.role = "superadmin";
                    }
                    else {
                        req.session.role = "admin";
                    }  
                    res.redirect('/dashboard');
                } else {
                    errors.push({
                        msg: "Invalid Password"
                    });

                    //login Failed Incorrect credentials
                    res.render('login', {
                        title: 'KoineyAdmin',
                        loginType: 'superAdmin',
                        loginAction: '/login',
                        errors: errors,
                        loginFailed: 'true'
                    });
                }
            }
        });
        
    }
});

//Logout Function
router.get('/logout', function (req, res, next) {
    req.session.destroy(function (err) {
        res.redirect('/login');
    });
});