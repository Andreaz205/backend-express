const HelpService = require("../services/HelpService.js");

class HelpController {
    async send(req, res, next) {
        try {
            const {email} = req.body
            console.log("ЭТО ИЗ helpКОНТРОЛЛЕРА    " + email)
            const promise = await HelpService.send(email)
            return res.json(promise)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new HelpController()