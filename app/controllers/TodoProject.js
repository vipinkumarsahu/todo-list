const express = require('express');
const router = express.Router();
const TodoList = require('../models/TodoModel');

module.exports = function (app) {
  app.use('/', router);
}

//view Project
router.get('/list-project', function (req, res) {
  TodoList.find()
    .exec(function (err, project) {
      if (err) {
        res.send(err);
      } else {
        res.render('adminLayout', {
          page: 'admin/admin_list_project',
          
          title: 'TodoList',
          activeSidebar: 'projects',
          projectData: project,
          projectId : ''
        });
      }
    });
});

//add Project
router.post('/add-project', function(req, res){
  let project_data = {
    projectName: req.body.pname
  }
  if(req.body.pstatus){
    project_data.status = req.body.pstatus;
  }
  if(req.body.ptype){
    project_data.projectType = req.body.ptype;
  }
  let project = new TodoList(project_data);
  project.save(function(err, data){
    if(err){
      res.send(err);
    }else{
      res.redirect('/list-project');
    }
  });
});

// Ajax add Task
router.post('/add-task1', function(req, res){
   
  var projectId = req.body.pId;
  TodoList.findById(projectId)
    .exec(function(err, data){
      if(err){
        res.send(err);
      }else{
        data.subTask.push({
          title:req.body.tname
        });
        data.save(function(err, data1){
          if(err){
            res.send(err);
          }else{
            res.send(data1);
          }
        });
      }
    }); 
});
// Project Tasks
router.get('/project-task/:pId',function(req, res){
  TodoList.find()
    .exec(function(err , data){
       if(err){
        res.send(err);
      }else{ 
          res.render('adminLayout', {
            page: 'admin/admin_list_project',
            title: 'TodoList',
            activeSidebar: 'projects',
            projectData: data,
            projectId : req.params.pId
          });
        } 
      });
});

//Add member
router.post('/add-members', function(req, res){
  let array = req.body.Ids.split('/');
  TodoList.findById(array[0])
    .exec(function(err, projectData){
      if(err){
        res.send(err);
      }else{
        let thisId = projectData.subTask.id(array[1]);
        thisId.member = req.body.memberId;  //memberId is not saved because it is object type and i am enter Number type
        thisId.status = req.body.tstatus;
        thisId.priority = req.body.pstatus;
        projectData.save(function(err, data){
          if(err){
            res.send(err);
          }else{
            res.redirect(`/project-task/${array[0]}`);
          }
        });
      }
    });
});

// Ajax request
// Add project
router.post('/add-project1', function(req, res){
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
});

// list task via Ajax
router.post('/list-subTask', function(req, res){

  TodoList.findById(req.body.projectId)
    .exec(function(err, data){
      if(err){
        res.send(err);
      }else{
        res.send(data);
      }
    })
})

router.all('/',function(req, res){
  console.log("rout hit");
  console.log("rout hit");
})