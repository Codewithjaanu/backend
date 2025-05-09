const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    UserId: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;
