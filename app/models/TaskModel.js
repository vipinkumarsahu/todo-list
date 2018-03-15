const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TaskSchema = new Schema({
  task: String,
  taskstatus:{
    type: Number,
    default:0   // default:0, processing:1, Done:2
  }
},{
  timestamps: true
});

module.exports = mongoose.model('Task',TaskSchema);