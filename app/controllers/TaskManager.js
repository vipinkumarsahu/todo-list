var express = require('express'),
  router = express.Router(); 
const Task = require('../models/TaskModel');

module.exports = function (app) {
  app.use('/', router);
}
//list tasks
router.get('/list-task', function (req, res) {
  Task.find()
    .exec(function (err, data) {
      if (err) {
        res.send(err);
      }
      res.render('adminLayout', {
        // page: 'admin/admin_add_task',
        page: 'admin/admin_jquery_drag_drop',
        title: 'Koiney',
        activeSidebar: 'tasks',
        tasks: data
      });
    });
});

//Add Tasks
router.post('/add-task', function(req, res){
  var task_data = {
    task : req.body.task
  }
  var task = new Task(task_data);
  task.save(function(err, data){
    if(err){
      res.send(err);
    }
    res.redirect('/list-task');
  });
});

// Update Task Status
router.get('/task-status/:status/:id', function(req, res){
  const status = req.params.status;
  const task_id = req.params.id;
  Task.findById(task_id)
    .exec(function(err, task){
      if(err){
        res.send(err);
      }
      task.taskstatus = status;
      task.save(function(err, updateTask){
        if(err){
          res.send(err);
        }
        res.redirect('/list-task');
      });
    }); 
});

//delete task
router.post('/delete-task', function(req, res){
  Task.findByIdAndRemove(req.body.id)
    .exec(function(err, data){
      if(err){
        res.send(err);
      }
      res.redirect('/list-task');
    })
})

//Ajax Call
// Drag and chenge status

/* router.post('/endpoint1/:id', function(req, res){
	var obj = {};
	obj.title = 'title';
	obj.data = 'data';
	
	console.log('params: ' + JSON.stringify(req.params));
	console.log('body: ' + JSON.stringify(req.body));
	console.log('query: ' + JSON.stringify(req.query));
	
	res.header('Content-type','application/json');
	res.header('Charset','utf8');
	res.send(req.query.callback + '('+ JSON.stringify(obj) + ');');
}); */

router.post('/endpoint', function(req, res){
  
  let data = req.body.id.split('/');
  let taskId = data[0];
  let taskstatus = data[1];
  let dropStatus = req.body.dropStatus;

  Task.findById(taskId)
    .exec(function(err, task){
      if(err){
        res.send(err);
      }
      task.taskstatus = dropStatus;
      task.save(function(err, updateTask){
        if(err){
          res.send(err);
        }
        res.send(req.body);
        // res.redirect('/list-task');
      });
    }); 
});