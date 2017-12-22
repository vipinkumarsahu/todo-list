// Admin model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var RoleSchema = new Schema({
    name: { type: String, required: true, unique: true },
    role_permissions: { type: JSON, required: true},
    status: { type: Number, required: true },
    created_at: Date,
    updated_at: Date
});

RoleSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

RoleSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at){
      this.created_at = currentDate;
    }
    next();
  });

module.exports = mongoose.model('Role', RoleSchema);