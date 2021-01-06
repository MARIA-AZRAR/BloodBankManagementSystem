const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true, trim: true, minlength: 3 },
    email: { type: String, required: true, unique: true },
    bloodGroup: { type: String },
    age: { type: String },
    bloodBank: { type: String },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, default: 'Active' },
    type: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
}, {
    timestamps: true,
});
// Export Bio Model
var User = mongoose.model('User', userSchema)
module.exports = User;