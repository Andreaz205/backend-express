const ApiError = require( "../../exceptions/api-error.js");
const TokenService = require( "../services/TokenService.js");

module.exports = function (req, res, next) {
    try {
        console.log(req.headers.authorization)
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError())
        }

        const accessToken = authorizationHeader.split(' ')[1]
        if (!accessToken) {
            next(ApiError.UnauthorizedError())
        }
        const userData = TokenService.validateAccessToken(accessToken)
        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }

        req.user = userData;
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}