// Admin model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var AdminSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: Date,
  updated_at: Date
});

AdminSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

AdminSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at){
      this.created_at = currentDate;
    }
    //hash password
    if (this.password) {
      this.password = globalFunctions.encryptPassword(this.password);
    }
    next();
  });

module.exports = mongoose.model('Admin', AdminSchema);