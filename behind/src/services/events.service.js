const event = require("../schema/events");
const {insertLog} = require("./log.service");
const {Op} = require('sequelize')
const fileNameAndPath = __filename;

class EventsService {

    async addEvents(op = "add", params, user) {
        params.userId = user.id;
        if (op === "add") {
            delete params.id;
            return event.create(params);
        } else if (op === "update") {
            // 改
            if (!params.id) {
                return null;
            } else {
                return await event.update(params, {where: {id: params.id}});
            }
        } else if (op === "delete") {
            if (!params.id) {
                return null;
            } else {
                await insertLog({
                    logType: "伪删除文章",
                    detail: `伪删除了事件:${params.id}`,
                    fileNameAndPath
                });
                return await event.destroy({
                    where: {
                        id: params.id
                    }
                });
            }
        } else if (op === "find") {
            // 查
            if (!params.id) {
                return null;
            } else {
                return await event.findAll({
                    where: params.id
                });
            }
        }
    }

    async getEvents(pageNum, pageSize, userId) {
        const offset = (pageNum - 1) * pageSize;
        return await event.findAndCountAll({
            offset: offset,
            limit: pageSize * 1,
            where: {
                userId
            },
            order: [
                // 我们从要排序的模型开始排序数组
                ["id", "DESC"]
            ]
        });
    }

    async getEventsById(id) {
        return await event.findOne({
            where: {
                id
            }
        });
    }

    // 通过日期和用户id获取当天事件
    async getEventsByDayAndId(dateString, userId = 1) {
        const date = new Date(dateString);
        // 设置日期时间为当天的开始和结束时间
        const startDate = new Date(date.setHours(0, 0, 0, 0)); // 开始时间为当天00:00:00
        const endDate = new Date(date.setHours(23, 59, 59, 999)); // 结束时间为当天23:59:59.999

        try {
            // 假设event是Sequelize模型实例
            const events = await event.findOne({
                where: {
                    updatedAt: {
                        [Op.between]: [startDate, endDate], // Op是Sequelize的操作符，用于构建查询条件
                    },
                    userId
                },
            });

            return events;
        } catch (error) {
            console.error('Error fetching events by day:', error);
            throw error; // 重新抛出错误以便上层可以处理
        }
    }

    // 通过id和userId删除
    async deleteEventsById(id, userId) {
        return await event.destroy({
            where: {
                id,
                userId
            }
        });
    }
}

module.exports = new EventsService();
