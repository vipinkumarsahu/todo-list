const express = require('express');
const router = express.Router();
const Member = require('../models/MemberModel');

module.exports = function(app){
  app.use('/',router);
}
// List Member 
router.get('/list-memeber', function(req, res){
  Member.find()
    .exec(function(err, member){
      if(err){
        res.send(err);
      }else{
        res.render('adminLayout',{
          page:'admin/admin_list_member',
          title: 'TodoList',
          activeSidebar: 'Members',
          memberData: member
        });
      }
    });
});

// Add Member
router.post('/add-member', function(req, res){
  let member_data = {
    name : req.body.name,
    email: req.body.email,
    phone: req.body.phone
  }
  let member = new Member(member_data);
  member.save(function(err, data){
    if(err){
      res.send(err);
    }else{
      res.render('/list-member');
    }
  });
});

//update Member
//delete Member