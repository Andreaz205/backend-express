const User = require("../models/User.js");

class FriendsService {
    async getUsersByQuery (currentPage, pageSize) {
        const users = await User.find();

        if (!currentPage ||!pageSize) {
            return users
        }

        console.log('from  friends service ' + currentPage, pageSize)

        let totalItemsCount = users.length

        const pagesCount = Math.ceil(totalItemsCount/pageSize)

        if (currentPage > pagesCount) {
            throw new Error
        }

        let PreviousRequestedUsers = []

        for (let i = pageSize * currentPage - 4 ; i < pageSize * currentPage +1 ; i++) {
            console.log(i)
            PreviousRequestedUsers.push(users[i])
        }
        let requestedUsers = PreviousRequestedUsers.filter((el) => {
            return el !==undefined
        })

        console.log(requestedUsers)

        let currentPageNumber = Number(currentPage)

        return {requestedUsers, totalItemsCount, currentPageNumber}
    }
}

module.exports =  new FriendsService