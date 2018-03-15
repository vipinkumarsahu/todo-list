// Dashboard.js

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    Admin = require(path.normalize(__dirname + '/../models/AdminModel')),
    validator = require(path.normalize(__dirname + '/../validators/loginValidator'));

module.exports = function (app) {
    app.use('/', router);
};

//Login Get Function
router.get('/dashboard', function (req, res, next) {
    res.render('adminLayout', {
        title: 'KoineyAdmin',
        loginType: 'admin',
        loginAction: '/login',
        page : 'admin/admin_dashboard'
    });
});
