const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const stateS = ['Open', 'Close']
const typeS = ['Limit', 'Market']
const orderS = ['Buy', 'Sale']
const showS = ['Visible', 'Invisible']

const order1Schema = new Schema({
    member_id: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    from_currency_code: {
        type: String,
        uppercase: true,
        minlength: 3,
        maxlength: 3
    },
    from_amount: {
        type: String
    },
    show: {
        type: String,
        enum: showS
    },
    volume: {
        type: String
    },
    to_currency_name: {
        type: String,
        uppercase: true,
        minlength: 3,
        maxlength: 3
    },
    to_amount: {
        type: String
    },
    processed: {
        type: String
    },
    state: {
        type: String,
        enum: stateS,

    },
    type: {
        type: String,
        enum: typeS,
    },
    order: {
        type: String,
        enum: orderS,
    },
    funds_received: {
        type: String
    },
    trades_count: {
        type: String
    },
    done_at: {
        type: Date
    },
    status: {
        type: String,
    },
    source: {
        type: String
    },
},{
    collection: 'order1'
}, {
        timestamps: true,
    })

module.exports = mongoose.model('Order', order1Schema);