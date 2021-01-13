const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bloodRequestSchema = new Schema({
    bloodGroup: { type: String, required: true, trim: true},
    quantity: { type: Number, required: true },
    address: { type: String, required: true },
    recipient_id: { type: Schema.Types.ObjectId, ref: 'User' },
    due_date: { type: Date, required: true}, 
    status: { type: String, default: 'Active'}
}, {
    timestamps: true,
});
// Export Bio Model
var BloodRequest = mongoose.model('BloodRequest', bloodRequestSchema)

module.exports = BloodRequest;