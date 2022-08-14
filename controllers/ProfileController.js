const ProfileService = require ('../services/ProfileService')

class ProfileController {
    async getStatus(req, res, next) {
        try {
            const {id} = req.query
            const status = await ProfileService.getStatus(id)
            return res.json(status)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async addStatus(req, res, next) {
        try {
            const {_id, status} = req.body
            const createdStatus = await ProfileService.addStatus(_id, status)
            return res.json(createdStatus)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = new ProfileController