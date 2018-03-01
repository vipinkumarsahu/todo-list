// Admins.js

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    Admin = require(path.normalize(__dirname + '/../models/AdminModel')),
    Role = require(path.normalize(__dirname + '/../models/RoleModel')),    
    validator = require(path.normalize(__dirname + '/../validators/adminValidator'));

module.exports = function (app) {
    app.use('/', router);
};

//list all admins
router.get('/list-admins', function (req, res, next) {
    Admin.find({})
        .populate('role')
        .exec(function (err, admins) {
        if (err) {
            var err = {
                status: 500,
                error: err
            }
            globalFunctions.errorPage(res, err);
        } else {
            console.log(typeof req.session.admin.role);
            res.render('adminLayout', {
                page: 'admin/admin_list_admins',
                title: 'KoineyAdmin',
                activeSidebar: 'admins',
                admins: admins
            });
        }

    });
});

//Add Admin
router.get('/add-admin', function (req, res, next) {    
    Role.find({status:1}, function (err, role) {
        if (err) {
            var err = {
                status: 500,
                error: err
            }
            globalFunctions.errorPage(res, err);
        }else{
            res.render('adminLayout', {
                page: 'admin/admin_add_admin',
                title: 'KoineyAdmin',
                title: 'Koiney',
                activeSidebar: 'admins',
                roles: role
            });
        }
        
    });
});

// Add Admin
router.post('/add-admin', function (req, res, next) {
    if (req.body.editType != undefined && req.body.editType == "true") {
        req.checkBody(validator.edituser);
    } else {
        req.checkBody(validator.adduser);
    }
    var err = req.validationErrors() || [];
    if (req.body.password != undefined && req.body.password.length > 0) {
        if (req.body.password != req.body.cpassword) {
            err.push({
                msg: "password should match"
            });
        }
    }
    if (err.length > 0) {
        req.flash('errors', err);
        res.redirect("/add-admin");
    } else {
        var data = {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            role:req.body.role
        };
        // check if request is edit type or add type
        if (req.body.editType != undefined && req.body.editType == "true") {
            if (req.body.password != undefined && req.body.password.length > 0) {
                data.password = req.body.password;
            }
            Admin.findOneAndUpdate(req.body.adminId, data, function (err, data) {
                if (err) {
                    var err = {
                        status: 500,
                        error: err
                    }
                    globalFunctions.errorPage(res, err);
                } else {
                    var log_data = {
                        item_id: req.body.adminId,
                        action: 'edit admin',
                        type: 2, //edit admin
                        u_id: req.session.admin.id,
                        u_type: 0
                    };
                    globalFunctions.admin_logs(log_data);
                    res.redirect('/list-admins');                    
                }
            });
        } else {
            if (req.body.password != undefined && req.body.password.length > 0) {
                data.password = req.body.password;
            }
            var newAdmin = new Admin(data);
            newAdmin.save(function (err, data) {
                if (err) {
                    var err = {
                        status: 500,
                        error: err
                    }
                    globalFunctions.errorPage(res, err);
                } else {
                    var log_data = {
                        item_id: data.lastval,
                        action: 'add admin',
                        type: 2, //add new admin
                        u_id: req.session.admin.id,
                        u_type: 0
                    };
                    globalFunctions.admin_logs(log_data);
                    res.redirect('/list-admins');                    
                }
            });
        }
    }
});

//Delete Admin
router.post('/delete-admin', function (req, res, next) {
    Admin.findByIdAndRemove({ _id: req.body.id }, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            var log_data = {
                item_id: req.body.id,
                action: 'delete admin',
                type: 2, //deleting admin
                u_id: req.session.admin.id,
                u_type: 0
            };
            globalFunctions.admin_logs(log_data);
            res.send("success");
        }
    });
});

//view admin
router.get('/view-admin/:id', function (req, res, next) {
    Admin.findOne({ _id: req.params.id }, function (err, data) {
        if (err) {
            var err = {
                status: 500,
                error: err
            }
            globalFunctions.errorPage(res, err);
        } else {
            var log_data = {
                item_id: req.params.id,
                action: 'view admin',
                type: 2, //view admin
                u_id: req.session.admin.id,
                u_type: 0
            };
            globalFunctions.admin_logs(log_data);
            res.render('adminLayout', {
                page: 'admin/admin_add_admin',
                title: 'Koiney',
                activeSidebar: 'admins',
                admin: data,
                viewAdmin: "view"
            });
        }
    });
});

//Edit ADMIN
router.get('/edit-admin/:id', function (req, res, next) {
    Admin.findOne({ _id: req.params.id }, function (err, data) {
        if (err) {
            var err = {
                status: 500,
                error: err
            }
            globalFunctions.errorPage(res, err);
        } else {
            Role.find({status:1}, function (err, role) {
                if (err) {
                    var err = {
                        status: 500,
                        error: err
                    }
                    globalFunctions.errorPage(res, err);
                }else{
                    res.render('adminLayout', {
                        page: 'admin/admin_add_admin',
                        title: 'Koiney',
                        activeSidebar: 'admins',
                        admin: data,
                        viewAdmin: "edit",
                        roles:role
                    });
                }
            });
        }
    });
});