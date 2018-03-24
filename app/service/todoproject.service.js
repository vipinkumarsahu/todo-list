const TodoList = require('../models/TodoModel');
const nodemailer = require("nodemailer");


module.exports.listProject = async function () {
  try {
    let data = await TodoList.find();
    return data;
  } catch (error) {
    throw error;
  }
}

module.exports.addProject = async function (projectData) {
  try {
    let project = new TodoList(projectData);
    /* project.save(function (err, data) {
      if (err) {
        throw err;
      } else {
        TodoList.find().exec(function (err, data1) {
          if (err) {
            throw err;
          } else {
            return data1;
          }
        });
      }
    }); */

    let saveRes = await project.save();
    let results = await TodoList.find({});
    return results;

  } catch (error) {
    throw error;
  }
}

module.exports.addTask = async function (projectData) {
  try {
    /* return await TodoList.findById(projectData.projectId)
      .exec(function (err, data) {
        if (err) {
          throw error;
        } else {
          data.subTask.push({
            title: projectData.title
          });
          data.save(function (err, data1) {
            if (err) {
              throw err;
            } else {
              return data1;
            }
          });
        }
      }); */
    // use above code or bellow

    let pdata = await TodoList.findById(projectData.projectId);
    pdata.subTask.push({
      title: projectData.title
    });
    let result = await pdata.save();
    return result;

  } catch (err) {
    throw err;
  }
}

module.exports.editTask = async function (dataPacket) {
  try {
    /* let data = await TodoList.findById(dataPacket.projectId)
      .exec(function (err, pdata) {
        if (err) {
          throw err;
        } else {
          let thisId = pdata.subTask.id(dataPacket.taskId);
          thisId.memberId = dataPacket.member;
          thisId.status = dataPacket.status;
          thisId.priority = dataPacket.priority;
          pdata.save(function (err, data) {
            if (err) {
              throw err;
            } else {
              return data;
            }
          });
        }
      }) */

    //Same task perform choose one of the one commented or this one.

    let pdata = await TodoList.findById(dataPacket.projectId);
    let thisId = pdata.subTask.id(dataPacket.taskId);
    thisId.memberId = dataPacket.member;
    thisId.status = dataPacket.status;
    thisId.priority = dataPacket.priority;
    let rdata = await pdata.save();

    // send mail to the assigned member.
    
    let mailer = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "vipin.trancis@gmail.com",
        pass: "trancis@123"
      }
    });
    let emailList = [];
    for(let memb in dataPacket.member){
      let val = dataPacket.member[memb];
      let val1 = memb;
      let val2 = constGlobals.member[memb].email;
      emailList.push(constGlobals.member[dataPacket.member[memb]].email);
    }
    let mailOptions = {
      to: emailList,
      subject: "Assigned Task",
      html: "<h2>Hello,</h2><br> Please Click on the link to verify your email.<br><a>Click here to go your dashboard</a>"
    }
    mailer.sendMail(mailOptions);
    return rdata;

  } catch (err) {
    throw err;
  }
}

function sendMail() {
  return new Promise((resolve, reject) => {
    mailer.sendMail(mailOptions, function (error, response) {
      if (error) {
        reject(error.message);
      } else {
        resolve("Message sent: " + response.message);
      }
    });
  })
}