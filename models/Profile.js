const mongoose = require ("mongoose")

const Profile = new mongoose.Schema({

    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    status: { type: String},

})

module.exports = mongoose.model("Profile", Profile)