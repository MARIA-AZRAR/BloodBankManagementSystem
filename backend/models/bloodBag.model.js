const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bloodBagSchema = new Schema({
    bloodGroup: { type: String, required: true, trim: true},
    quantity: { type: Number, required: true },
    bloodBank_id: {type: Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: Date.now },
    expiry_date: { type: Date}

}, {
    timestamps: true,
});
// Export Bio Model
var bloodBag = mongoose.model('bloodBag', bloodBagSchema)

module.exports = bloodBag;