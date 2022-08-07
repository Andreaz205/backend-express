const User = require ("../models/User.js");
const bcrypt = require ("bcrypt")
// import {v1} from "uuid"
// import MailService from "./MailService.js";
const TokenService = require ("./TokenService.js");
const UserDto = require ("../dtos/userDto.js");
const ApiError = require ("../../exceptions/api-error.js");



class UserService {
    async registration (email, password) {
        console.log("ЭТО ИЗ ЮЗЕРСЕРВИСА    " + email, password)
        const candidate = await User.findOne({email});
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        // const activationLink = v1()

        const user = await User.create({email, password: hashPassword}) // +activationLink
        // await MailService.sendActivationMail(email, `http://localhost:5000/api/activate/${activationLink}`)

        // console.log(user)

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async deleteOne (email) {
        console.log(email)
        const candidate = await User.deleteOne({email})
        if (!candidate) {
            throw ApiError (`Пользователя с почтовым адресом ${email} не существует`)
        }
        return candidate
    }

    async login (email, password) {

            const user = await User.findOne({email})
            if (!user) {
                throw ApiError (`Пользователя с почтовым адресом ${email} не существует`)
            }
            console.log(email, password)
            const isPassEquals = await bcrypt.compare(password, user.password)
            if (!isPassEquals) {
                throw ApiError (`Неверный пароль`)
            }
            const userDto = new UserDto(user)
            const tokens = TokenService.generateTokens({...userDto})

            await TokenService.saveToken(userDto.id, tokens.refreshToken)
            return {...tokens, user: userDto}
    }

    async logout (refreshToken) {
        const token = await TokenService.removeToken(refreshToken)
        return {token}
    }

    async refresh (refreshToken) {
        console.log(refreshToken)
        if (!refreshToken) {
            throw ApiError (`Error user service ref tok`)
        }

        const userData = TokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = TokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw new Error (`Error user service ref tok`)
        }
        const user = await User.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})

        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async getAllUsers () {
        const users = await User.find()
        return users
    }


}

module.exports = new UserService();