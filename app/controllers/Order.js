var express = require('express'),
    router = express.Router(),
    path = require('path'), 
    Order = require('../models/OrderModel');

module.exports = function(app){
    app.use('/',router);
} 

router.get('/list-orders',function(req, res, next){
    Order.find({}, null, {createdAt: -1}, function(err, data){ 
        if(err){
            var err = {
                status: 500,
                error: err
            }
            globalFunctions.errorPage(res,err);
        }else{
            res.render('adminLayout',{
                page:'admin/admin_list_orders',
                title:'Koiney',
                activeSidebar: 'orders',
                orders: data
            });
        }
    });
});

//view Order
router.get('/view-order/:id',function(req, res, next){
    Order.findOne({ _id: req.params.id}, function(err, data){
        if(err){
            var err = {
                status: 500,
                error: err
            }
            globalFunctions.errorPage(res, err);
        }else{
            log_data ={
                item_id: req.params.id,
                action: 'view order',
                type: 1,
                u_id: req.session.admin.id,
                u_type: 0,
                discription_text: 'Order "'+ data.user +'" viewed'
            };
            globalFunctions.admin_logs(log_data);
            res.render('adminLayout',{
                page: 'admin/admin_add_order',
                title: 'Koiney',
                activeSidebar: 'order',
                order: data,
                viewOrder: "view"
            });
        }
    });
});

//Order Deactivate/Activate
router.post('/deactivate-order', function(req, res, next) {
    if(req.body.status == 2){
        status = 1;
    }else if(req.body.status == 1){
        status = 2;
    }else{
        res.send("Unauthorised");
    }
    var tableData = {
        status: status
    }
    var id = req.body.order_id;
    Order.findByIdAndUpdate(id, tableData, function(err, order) {
        if(err){
            res.send(err);
        }else{
            var log_data = {
                item_id: req.body.order_id,
                action: 'deactivate order',
                type: 1, //activate or deactivate user
                u_id: req.session.admin.id,
                u_type: 0,
                discription_text: 'User "' + order.id + '" is deactivated.'
            }
            if (status == 1) {
                log_data.action = 'activate order';
                discription_text: 'Order "' + order.id + '" is activated.'
            }
            globalFunctions.admin_logs(log_data);

            if (status == 1) {
                var msg = '<a href="javascript:;" class="btn btn-danger clearfix pull-right" title="Deactivate?" data-real-target="#deactive-' + id + '" data-inline-loader="1" data-post-order_id="' + id + '" data-post-status="1" data-post-type="1" data-act="ajax-request" data-action-url="/deactivate"><i class="fa fa-ban"></i></a>';
                res.send(msg);
            } else {
                var msg = '<a href="javascript:;" class="btn btn-success clearfix pull-right" title="Activate?" data-real-target="#deactive-' + id + '" data-inline-loader="1" data-post-order_id="' + id + '" data-post-status="2" data-post-type="1" data-act="ajax-request" data-action-url="/deactivate"><i class="fa fa-check"></i>';
                res.send(msg);
            }
        }
    });
});
 