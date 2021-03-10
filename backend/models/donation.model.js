const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donationSchema = new Schema({
    bloodGroup: { type: String, required: true, trim: true},
    quantity: { type: Number, required: true },
    donation_id: { type: Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: Date.now }
}, {
    timestamps: true,
});
// Export Bio Model
var Donation = mongoose.model('Donation', donationSchema)

module.exports = Donation;

