const mongoose = require ("mongoose")

const User = new mongoose.Schema({
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activatedLink: {type: String},

})

module.exports = mongoose.model("User", User)