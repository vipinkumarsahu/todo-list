const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  status: {
    type: Number,
    default: 0
  },
  dueDate: {
    type: Date
  },
  priority: {
    type: Number,
    default: 0
  },
  attachment: {
    type: String
  },
  memberId:{
    type:[ Number]
  }
  /* memberId:[ {
    type: Schema.ObjectId,
    ref: 'Members'
  }] */
});

const todoSchema = new Schema({
  projectName: {
    type: String,
    require: true
  },
  projectType: {
    type: String
  },
  subTask: [taskSchema],
  priority: {
    type: Number,
    default: 0
  }
}, {
    usePushEach: true
  }, {
    timestamps: true
  }, {
    collection: 'todos'
  });

module.exports = mongoose.model('Todo', todoSchema);