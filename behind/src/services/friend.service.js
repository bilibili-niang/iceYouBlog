const friendLinks = require('../schema/friendLinks');

class FriendService {
    // 返回所有friendLinks
    async getAllFriendLinks() {
        return await friendLinks.findAll({
            raw: true
        })
    }

// 增
    async getAddResult(form) {
        form.img = form.url + `/favicon.ico`;
        return await friendLinks.create(form, {
            raw: true
        })
            .then(res => {
                console.log(res)
            })
            .catch(e => {
                console.log('失败了')
                console.log("e")
                console.log(e)
            })
    }
}

module.exports = new FriendService();