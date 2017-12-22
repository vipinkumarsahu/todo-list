// Roles model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var RoleSchema = new Schema({
    name: { type: String, required: true, unique: true },
    role_permissions: { type: JSON, required: true},
    status: { type: Number, required: true, default :1 },
},{
    timestamps: true
});

module.exports = mongoose.model('Role', RoleSchema);