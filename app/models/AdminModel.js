// Admin model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var AdminSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: String,
  phone: String,
  role: String,
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