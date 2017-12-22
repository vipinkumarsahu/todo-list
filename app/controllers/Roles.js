// Roles.js

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    Role = require(path.normalize(__dirname + '/../models/RoleModel')),
    validator = require(path.normalize(__dirname + '/../validators/roleValidator'));

module.exports = function (app) {
    app.use('/', router);
};

//list all roles
router.get('/roles', function (req, res, next) {
    Role.find({status:1}, function (err, role) {
        if (err) {
            var err = {
                status: 500,
                error: err
            }
            globalFunctions.errorPage(res, err);
        }else{
            res.render('adminLayout', {
                page: 'admin/admin_list_roles',
                title: 'KoineyAdmin',
                activeSidebar: 'roles',
                roles: role
            });
        }
        
    });
});

//view role
router.get('/view-role/:id', function (req, res, next) {
    Role.findOne({ _id: req.params.id }, function (err, role) {
        if (err) {
            var err = {
                status: 500,
                error: err
            }
            globalFunctions.errorPage(res, err);
        } else {
            var log_data = {
                item_id: req.params.id,
                action: 'view role',
                type: 0, //view role
                u_id: req.session.admin.id,
                u_type: 0
            };
            globalFunctions.admin_logs(log_data);

            res.render('adminLayout', {
                page: 'admin/admin_add_role',
                title: 'Koiney Admin',
                activeSidebar: 'roles',
                role: role.toObject(),
                viewRole: "view"
            });
        }

    });
});

//Add role
router.get('/add-role', function (req, res, next) {
    res.render('adminLayout', {
        page: 'admin/admin_add_role',
        title: 'Koiney Admin',
        activeSidebar: 'roles',
    });
});

// Add  role
router.post('/add-role', function (req, res, next) {
    req.checkBody(validator.addrole);
    var err = req.validationErrors() || [];
    if (req.body.password != req.body.cpassword) {
        err.push({
            msg: "password should match"
        });
    }
    if (err.length > 0) {
        req.flash('errors', err);
        res.redirect("/add-role");
    } else {
        var newRole = {
            name: req.body.name,
            role_permissions: JSON.parse(req.body.permissions) || {},
            status: 1
        };

        //check if req is edit type or add type
        if (req.body.editType != undefined && req.body.editType == "true") {
            Role.findOneAndUpdate(req.body.roleId, newRole, function (err, role) {
                if (err) {
                    var err = {
                        status: 500,
                        error: err
                    }
                    globalFunctions.errorPage(res, err);
                } else {
                    var log_data = {
                        item_id: req.body.roleId,
                        action: 'edit role',
                        type: 0, //edit role
                        u_id: req.session.admin.id,
                        u_type: 0
                    };
                    globalFunctions.admin_logs(log_data);
                    res.redirect('/roles');
                }
            });
        } else {
            newRole = new Role(newRole);
            newRole.save(function(err) {
                if(err){
                    var err = {
                        status: 500,
                        error: err
                    }
                    globalFunctions.errorPage(res, err);
                }else{
                    res.redirect('/roles');
                }
            });
                
        }
    }
});

//Delete a role
router.post('/delete', function (req, res, next) {
    Role.findByIdAndRemove({ _id: req.body.id }, function (err, role) {
        if (err) {
            var err = {
                status: 500,
                error: err
            }
            globalFunctions.errorPage(res, err);
        } else {
            var log_data = {
                item_id: req.body.id,
                action: 'delete role',
                type: 0, //deleting role
                u_id: req.session.admin.id,
                u_type: 0
            };
            globalFunctions.admin_logs(log_data);
            res.send("success");
        }

    });
});

//Edit role
router.get('/edit-role/:id', function (req, res, next) {
    Role.findOne({ _id: req.params.id }, function (err, role) {
        if (err) {
            var err = {
                status: 500,
                error: err
            }
            globalFunctions.errorPage(res, err);
        } else {
            var log_data = {
                item_id: req.params.id,
                action: 'Edit role',
                type: 0, //view role
                u_id: req.session.admin.id,
                u_type: 0
            };
            globalFunctions.admin_logs(log_data);

            res.render('adminLayout', {
                page: 'admin/admin_add_role',
                title: 'Koiney Admin',
                activeSidebar: 'roles',
                role: role.toObject(),
                viewRole: "edit"
            });
        }

    });
});

//Get roles
router.post('/get-roles', function (req, res, next) {
    Role.find({ status: 1 }, function (err, role) {
        if (err) {
            res.send({ status: false, err: err });
        } else {
            res.send(role);
        }
    });
});