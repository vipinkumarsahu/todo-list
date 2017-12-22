// Admin model

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    address: String,
    phone: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: Number, required: true, default : 1 }
},{
    timestamps: true
});

UserSchema.pre('save', function (next) {
    //hash password
    if (this.password) {
        this.password = globalFunctions.encryptPassword(this.password);
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);