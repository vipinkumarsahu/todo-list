// admin.js

var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Admin = mongoose.model('Admin'),
    bcrypt = require('bcryptjs'),
    validator = require('../validator/adminValidator');

var saltRounds = 10;

var encryptPassword = function (val) {
    val = bcrypt.hashSync(val, saltRounds);;
    return val;
}

var checkPassword = function (val, hash) {
    if (bcrypt.compareSync(val, hash)) {
        return true;
    } else {
        return false;
    }
}

module.exports = function (app) {
    app.use('/admin', router);
};
//Login Get Function
router.get('/login', function (req, res, next) {
    res.render('login', {
        title: 'TapRecharge',
        loginType: 'admin',
        loginAction: '/admin/login',
    });
});

//login post function
router.post('/login', function (req, res, next) {
    req.checkBody(validator.login);

    var errors = req.validationErrors();
    if (errors) {
        res.render('login', {
            title: 'TapRecharge',
            loginType: 'superAdmin',
            loginAction: '/admin/login',
            errors: errors
        });
        return;
    } else {
        var errors = [];
        var keepSignIn = req.body.keepSignIn;
        if (keepSignIn == '1') {
            //code to set session from cookie data
        }

        var where = "username='" + req.body.username + "'";
        db.mainModel.selectData("admins", where, function (err, data) {
            if (err) {
                res.send(err);
            } else if (data.length === 0) {
                req.flash('errors', [{
                    msg: "Invalid username"
                }]);
                res.redirect('/admin/login');
            } else {
                if (checkPassword(req.body.password, data[0].password) /* && data[0].status != '0'*/) {
                    req.session.superAdmin = data[0];
                    if (data[0].type == 0) {
                        req.session.role = "superadmin";
                    }
                    else {
                        req.session.role = "admin";
                    }

                    res.redirect('/admin/dashboard');
                } else {
                    errors.push({
                        msg: "Invalid Password"
                    });

                    //login Failed Incorrect credentials
                    res.render('login', {
                        title: 'TapRecharge',
                        loginType: 'superAdmin',
                        loginAction: '/admin/login',
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
        res.redirect('/admin/login');
    });
});