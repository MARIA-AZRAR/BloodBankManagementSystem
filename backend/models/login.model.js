const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true, 
        minlength: 3
    },
    password: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
}, {
    timestamps: true,
});
// Export Bio Model
var Login = mongoose.model('Login', userSchema)

module.exports = Login;