// User model

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    phone: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        index: true,
        trim: true
    },
    services: {
        facebook: String,
        google: String
    }, 
    picture: {
        type: String,
        trim: true
    },
    active: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
    },
    otpno: {
        type: String,
        default: '000000'
    },
    isNumberActive: {
        type: Boolean,
        default: false
    },
    otpdate: {
        type: Date
    },
    emaildate: {
        type: Date
    },
    address: String, 
    status: { type: Number, required: true, default : 1 }
},{
    collection: 'users'
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