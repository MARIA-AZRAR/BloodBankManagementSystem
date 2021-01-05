const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    username: { type: String, required: true, trim: true, minlength: 5 , unique:true},
    password: { type: String, required: true },
    type: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true,
});
// Export Bio Model
var Login = mongoose.model('Login', loginSchema)

module.exports = Login;