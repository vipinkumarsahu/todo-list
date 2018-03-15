// Admin model

const path = require('path');
const Role = require(path.normalize(__dirname + '/../models/RoleModel'));
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var AdminSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: String,
  phone: String,
  role: [{type: Schema.Types.ObjectId, ref: 'Role'}],
},{
    timestamps: true
});

AdminSchema.pre('save', function (next) {
    //hash password
    if (this.password) {
      this.password = globalFunctions.encryptPassword(this.password);
    }
    next();
  });

module.exports = mongoose.model('Admin', AdminSchema);