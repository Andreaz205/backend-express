const Profile = require("../models/Profile.js");

class ProfileService {
    async getStatus(id) {
        // if (!post._id) {
        //     throw new Error("Id не указан")
        // }
        const candidate = await Profile.findOne({user: id})
        return candidate.status

    }

    async addStatus(id, status) {
        // if (!post._id) {
        //     throw new Error("Id не указан")
        // }
        console.log(id, status)
        const candidate = await Profile.findByIdAndUpdate(id, {
            $set: {
                status
            }},
        {new: true})
        console.log(candidate)
        return candidate.status

    }
}

module.exports = new ProfileService