const UserService = require("../services/UserService.js");

class UserController {
    async registration (req, res, next) {
        try {
            const {email, password} = req.body
            console.log("ЭТО ИЗ ЮЗЕРКОНТРОЛЛЕРА    " + email, password)
            const userData = await UserService.registration (email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 *24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login (req, res, next) {
        try {
            const {email, password} = req.body;

            console.log(email, password)
            const userData = await UserService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 *24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout (req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await UserService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    // async activate (req, res, next) {
    //     try {
    //
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    async refresh (req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await UserService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 *24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async getUsers (req, res, next) {
        try {
            const users = await UserService.getAllUsers()
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }

    async deleteUser (req, res, next) { // not working
        try {
            const email = req.params.email
            console.log(req.params.email)
            const deletedUser = await UserService.deleteOne(email)
            res.status(200).json(deletedUser)
        } catch (e) {
            next(e)
        }
    }
}

module.exports=  new UserController();