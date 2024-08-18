const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Objectid = Schema.ObjectId;

const product = new Schema({
    id: {type: Objectid},
    name_product:{type: String},
    price_new:{type: String},
    price_old:{type: String},
    image: {type: String},
    desc: {type: String},
    quantity:{type: Number},
    id_cate: {type: Objectid, ref:'category'}
})
module.exports = mongoose.models.product || mongoose.model('product',product);
