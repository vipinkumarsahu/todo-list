// User model

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const roles = ['user', 'admin']
const proofDocS = ['passportDoc', 'drivingLicenceDoc', 'identityCardeDoc', 'taxDoc']
// const proofNoS = ['passportNo', 'drivingLicenceNo','taxNo','identityCardeNo']
const kycApproveS = ['0', '1', '2']

const userKyc = new Schema({
    contry: {
        type: String
    },
    trn: {
        type: String
    },
    issue_date: {
        type: String
    },
    exp_data: {
        type: String
    },
    proofDoc: {
        type: String,
        enum: proofDocS
    },
    proofNo: {
        type: Number
        // enum : proofNoS
    },
    kycApprove: {
        type: Number,
        enum: kycApproveS,
        default: '0'
    }
})

const userAddress = new Schema({
    streetAddress1: {
        type: String
    },
    streetAddress2: {
        type: String
    },
    city: {
        type: String
    },
    postalCode: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    }
})

const userBankDetail = new Schema({
    accountNumber: {
        type: Number,
        minlength: 10,
        maxlength: 30
    },
    ifsc: {
        type: String,
        minlength: 11,
        uppercase: true,
        match: /^[A-Z]{4}\d{7}$/
    },
    accountType: {
        type: String
    },
    bankName: {
        type: String
    },
    bankDocument: {
        type: String
    }
}
    , {
        timestamps: true
    })

const userSchema = new Schema({
    user_id: {
        type: String,
        trim: true
    },
    updateToken: {
        type: String
    },
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
    role: {
        type: String,
        enum: roles,
        default: 'user'
    },
    picture: {
        type: String,
        trim: true
    },
    twoFactor: {
        secret: {
            type: String
        },
        uri: {
            type: String
        }
    },
    firstName: {
        type: String,
        index: true,
        trim: true
    },
    lastName: {
        type: String,
        index: true,
        trim: true
    }, 
    active: {
        default: false
    },
    token: {
        type: String
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
    address: userAddress,
    kyc: userKyc,
    bankdetail: [userBankDetail],
    otp2fa: {
        type: String
    },
    status: { type: Number, required: true, default: 1 }
},{
    collection: 'users'
}, {
        timestamps: true
    })


userSchema.pre('save', function (next) {
    //hash password
    if (this.password) {
        this.password = globalFunctions.encryptPassword(this.password);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);