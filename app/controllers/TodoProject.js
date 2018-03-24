const express = require('express');
const router = express.Router();
const TodoList = require('../models/TodoModel');
const todoService = require('../service/todoproject.service');
const fileUpload = require('../BaseController/fileUpload');

module.exports = function (app) {
  app.use('/', router);
}

//view Project

router.get('/list-project', function (req, res, next) {
  todoService.listProject()
    .then((data) => {
      res.render('adminLayout', {
        // page: 'admin/admin_list_project',
        page: 'admin/admin_test_list_project',
        title: 'TodoList',
        activeSidebar: 'projects',
        projectData: data,
        projectId: ''
      });
    })
    .catch((err) => {
      res.send(err);
    });
});



//add Project via ajax
router.post('/add-project1', function (req, res) {
  let projectData = {
    projectName: req.body.pname,
    projectType: req.body.ptype
  }
  todoService.addProject(projectData)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      req.send(error);
    });
});

// Ajax add Task
router.post('/add-task1', function (req, res, next) {
  let projectData = {
    projectId: req.body.pId,
    title: req.body.tname
  }
  todoService.addTask(projectData)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send(error);
    });
});

// Project Tasks // currently it is not in use
router.get('/project-task/:pId', function (req, res) {
  TodoList.find()
    .exec(function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.render('adminLayout', {
          // page: 'admin/admin_list_project',
          page: 'admin/admin_test_list_project',
          title: 'TodoList',
          activeSidebar: 'projects',
          projectData: data,
          projectId: req.params.pId
        });
      }
    });
});

//Add member // currently not in use
router.post('/add-members', function (req, res) {
  let array = req.body.Ids.split('/');
  TodoList.findById(array[0])
    .exec(function (err, projectData) {
      if (err) {
        res.send(err);
      } else {
        let thisId = projectData.subTask.id(array[1]);
        thisId.member = req.body.memberId;  //memberId is not saved because it is object type and i am enter Number type
        thisId.status = req.body.tstatus;
        thisId.priority = req.body.pstatus;
        projectData.save(function (err, data) {
          if (err) {
            res.send(err);
          } else {
            res.redirect(`/project-task/${array[0]}`);
          }
        });
      }
    });
});

// Edit Task add members
router.post('/edit-task' ,function (req, res) {
  let array = req.body.Ids.split('/');
  let dataPacket = {};
  dataPacket.member = req.body.member;   
  dataPacket.status = req.body.tstatus;
  dataPacket.priority = req.body.pstatus;
  dataPacket.projectId = array[0];
  dataPacket.taskId = array[1];
  todoService.editTask(dataPacket)
  .then(() => {
    res.send(data);
  })
  .catch((err)=>{
    res.send(err);
  })

})

// Ajax request
// Add project
/* router.post('/add-project1', function(req, res){
  let projectData = {
    projectName: req.body.pname,
    projectType: req.body.ptype
  }
  let data = new TodoList(projectData);
  data.save(function(err, pdata){
    if(err){
      res.send(err);
    }else{
      TodoList.find()
        .exec(function(err, data){
          if(err){
            res.send(err);
          }else{
            res.send(data);
          }
        });
    }
  });
}); */

// list task via Ajax
router.post('/list-subTask', function (req, res) {

  TodoList.findById(req.body.projectId)
    .exec(function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    })
})

router.all('/', function (req, res) {
  console.log("rout hit");
  console.log("rout hit");
})