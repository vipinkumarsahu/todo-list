const mongoose = require('mongoose');
const Schema = mongoose.Schema;   

const paymentTransactionsSchema = new Schema({
    userData: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    txid: {
        type: String
    },
    amount: {
        type: String
    },
    confirmations: {
        type: String
    },
    address: {
        type: String
    },
    state: {
        type: String
    },
    aasm_state: {
        type: String
    },
    receive_at: {
        type: String
    },
    done_at: {
        type: String
    },
    currency: {
        type: String
    },
    type: {
        type: String
    },
    txout: {
        type: String
    }
},{
        collection: 'paymenttransactions'
},{
        timestamps: true 
});

module.exports = mongoose.model('Payment',paymentTransactionsSchema);