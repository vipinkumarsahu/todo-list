const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone:{
    type:Number,
    unique: true
  }
},{
  timestamps: true
},{
  collection : 'todos'
});

module.exports = mongoose.model('Member',memberSchema);