// Users.js

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    bcrypt = require('bcryptjs'),
    User = require(path.normalize(__dirname + '/../models/UserModel')),
    validator = require(path.normalize(__dirname + '/../validators/userValidator'));

const saltRound = 10;
var encryptPassword = function(val){
    val = bcrypt.hashSync(val, saltRound);
    return val
}

module.exports = function (app) {
    app.use('/', router);
};
var saltRounds = 10;


var encryptPassword = function(val) {
    val = bcrypt.hashSync(val, saltRounds);
    return val;
};

//list all users
router.get('/list-users', function (req, res, next) {
    User.find({}, null, { createdAt: -1 }, function (err, data) {
        if (err) {
            var err = {
                status: 500,
                error: err
            }
            globalFunctions.errorPage(res, err);
        } else {
            res.render('adminLayout', {
                page: 'admin/admin_list_users',
                title: 'Koiney',
                activeSidebar: 'users',
                users: data
            });
        } 
    });
});

//view user
router.get('/view-user/:id', function (req, res, next) {
    User.findOne({ _id: req.params.id }, function (err, data) {
        if (err) {
            var err = {
                status: 500,
                error: err
            }
            globalFunctions.errorPage(res, err);
        } else {
            var log_data = {
                item_id: req.params.id,
                action: 'view user',
                type: 1, //view user
                u_id: req.session.admin.id,
                u_type: 0,
                discription_text: 'User "' + data.email + '" viewed'
            };
            globalFunctions.admin_logs(log_data);
        
            res.render('adminLayout', {
                page: 'admin/admin_add_user',
                title: 'Koiney',
                activeSidebar: 'users',
                user: data,
                viewUser: "view"
            });
        }
    });
});

//User Deactivate/Activate
router.post('/deactivate', function (req, res, next) {
    if (req.body.status == 2) {
        status = 1;
    } else if (req.body.status == 1) {
        status = 2;
    } else {
        res.send("Unauthorised");
    }
    var tableData = {
        status: status
    };
    var id = req.body.user_id;
    User.findByIdAndUpdate(id, tableData, function (err, user) {
        if (err) {
            res.send(err);
        } else {
            var log_data = {
                item_id: req.body.user_id,
                action: 'deactivate user',
                type: 1, //activate or deactivate user
                u_id: req.session.admin.id,
                u_type: 0,
                discription_text: 'User "' + user.email + '" is deactivated.'
            };
            if (status == 1) {
                log_data.action = 'activate user';
                discription_text: 'User "' + user.email + '" is activated.'
            }
            globalFunctions.admin_logs(log_data);

            if (status == 1) {
                var msg = '<a href="javascript:;" class="btn btn-danger clearfix pull-right" title="Deactivate?" data-real-target="#deactive-' + id + '" data-inline-loader="1" data-post-user_id="' + id + '" data-post-status="1" data-post-type="1" data-act="ajax-request" data-action-url="/deactivate"><i class="fa fa-ban"></i></a>';
                res.send(msg);
            } else {
                var msg = '<a href="javascript:;" class="btn btn-success clearfix pull-right" title="Activate?" data-real-target="#deactive-' + id + '" data-inline-loader="1" data-post-user_id="' + id + '" data-post-status="2" data-post-type="1" data-act="ajax-request" data-action-url="/deactivate"><i class="fa fa-check"></i>';
                res.send(msg);
            }
        }
    });
});

//Add User
router.get('/add-user', function (req, res, next) {
    res.render('adminLayout', {
        page: 'admin/admin_add_user',
        title: 'Koiney',
        activeSidebar: 'users'
    });
});

// Add  User
router.post('/add-user', function (req, res, next) {
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
        res.redirect("/add-user");
    } else {
        var data = {
            name: req.body.name,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            role: req.body.role || 1,
            status: 1,
            notification_type: '{0,1,2}'
        };
        //check if req is edit type or add type
        if (req.body.editType != undefined && req.body.editType == "true") {
            User.findByIdAndUpdate(req.body.userId, data, function (err, userData) {
                if (err) {
                    var err = {
                        status: 500,
                        error: err
                    }
                    globalFunctions.errorPage(res, err);
                } else {
                    res.redirect('/list-users');
                }
            });
        } else {
            if (req.body.password != undefined && req.body.password.length > 0) {
                data.password = req.body.password;
            }
            var newUser = new User(data);
            newUser.save(function (err, data2) {
                if (err) {
                    var err = {
                        status: 500,
                        error: err
                    }
                    globalFunctions.errorPage(res, err);
                } else {
                    var log_data = {
                        item_id: data2.lastval,
                        action: 'add user',
                        type: 1, //add user
                        u_id: req.session.admin.id,
                        u_type: 0,
                        discription_text: 'User "' + data.email + '" added with Name: ' + data.name + '; Mobile No: ' + data.phone + ';'
                    };
                    globalFunctions.admin_logs(log_data);
                    res.redirect('/list-users');                   
                }                
            });
        }
    }
});

//Delete a user
router.post('/delete-user', function (req, res, next) {
    User.findByIdAndRemove({ _id: req.body.id }, function (err, uldata) {
        if (err) {
            res.send(err);
        } else {
            var log_data = {
                item_id: req.body.id,
                action: 'delete user',
                type: 1, //deleting user
                u_id: req.session.admin.id,
                u_type: 0,
                discription_text: 'User "' + uldata.email + '" deleted'
            };
            globalFunctions.admin_logs(log_data);

            res.send("success");
        }
    });
});

//Edit User
router.get('/edit-user/:id', function (req, res, next) {
    User.findOne({ _id: req.params.id }, function (err, data) {
        if (err) {
            var err = {
                status: 500,
                error: err
            }
            globalFunctions.errorPage(res, err);
        } else {
            res.render('adminLayout', {
                page: 'admin/admin_add_user',
                title: 'Koiney',
                activeSidebar: 'users',
                user: data, 
                viewUser: "edit"
            });
        }
    });
});

// kyc-approved

router.get('/kyc/:check', function(req, res, next){
    let check1 = req.params.check;
    
    User.find({'kyc.kycApprove' : check1}, function (err, data) {
        if (err) {
            var err = {
                status: 500,
                error: err
            }
            globalFunctions.errorPage(res, err);
        } else {
            res.render('adminLayout', {
                page: 'admin/admin_list_users',
                title: 'Koiney',
                activeSidebar: 'users',
                users: data
            });
        } 
    });
})

// View KYC
router.get('/view-kyc/:id', function(req, res, next){
    let userId = req.params.id;
    User.findOne({ _id: userId}, function(err, data){
        if (err) {
            var err = {
                status: 500,
                error: err
            }
            globalFunctions.errorPage(res, err);
        } else {
            res.render('adminLayout', {
                page: 'admin/admin_view_kyc',
                title: 'Koiney',
                activeSidebar: 'users',
                user: data,
                viewKyc: 'view'
            });
        } 
    })
})

//KYC Accept or Reject

router.get('/Kyc-accept/:check/:userId', function(req, res, next){
    let check1 = req.params.check;
    let userId = req.params.userId;
    User.findByIdAndUpdate({_id:userId}, {$set: {'kyc.kycApprove': check1}}, function(err, data) {
        if(err){
            var err = {
                status: 500,
                error: err
            }
            globalFunctions.errorPage(res, err);
        }else{

            res.redirect("/list-users");
        }
    });
});

 