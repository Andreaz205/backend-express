const FriendsService = require("../services/FriendsService.js");

class FriendsController {
    async getUsers(req, res, next) {
        try {
            console.log(req.query)
            const {currentPage, pageSize} = req.query
            console.log(currentPage, pageSize)
            const friendsData = await FriendsService.getUsersByQuery(currentPage, pageSize)
            res.json(friendsData)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = new FriendsController