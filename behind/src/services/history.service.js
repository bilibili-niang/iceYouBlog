const history = require('../schema/history');
const searchHistory = require('../schema/search.history');
const jwt = require('jsonwebtoken');
const {JsonWebTokenError} = require('../constant/err.type');

class HistoryService {
    async getUserBlogHistoryIds(email, type = 'blog') {
        return await history.findAll({
            attributes: ['fileId'],
            where: {
                email,
                type
            },
            raw: true,
            limit: 100,
            order: [
                // 我们从要排序的模型开始排序数组
                ['id', 'DESC']
            ]
        });
    }

    // 插入搜索历史记录
    async insertSearchHistory(email, key, type = 'search') {
        await history.create({
            email, key, type
        })
            .then(res => {
                console.log('成功')
            })
            .catch(e => {
                console.log('失败')
                console.log(e)
            })
    }

// 获取指定用户的所有搜索记录
    async getUserAllSearchHistory(email) {
        return await history.findAll({
            attributes: {
                exclude: ['updatedAt', 'id', 'email']
            },
            where: {
                email,
                type: 'search'
            },
            raw: true,
            order: [
                // 我们从要排序的模型开始排序数组
                ['id', 'DESC']
            ],
            limit: 100
        })
    }

// 记录用户点赞
    async logHistoryByEmail(id, email) {
        console.log('---logHistoryByEmail---写入点赞记录')
        history.create({
            fileId: id,
            email,
            type: 'support'
        });
    }
}

module.exports = new HistoryService();