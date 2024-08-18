const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Objectid = Schema.ObjectId;

const user = new Schema({
    id: {type: Objectid},
    username:{type: String},
    fullname:{type: String},
    email:{type: String},
    password: {type: String},
    phone: {type: String, required: true, match: /^[0-9]{10}$/ },
    role:{type: String},
    address: {type: String },
    reset_token: {type: String}
})
module.exports = mongoose.models.user || mongoose.model('user',user);
