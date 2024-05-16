const errType = require("../constant/err.type");
const eventsS = require("../services/events.service");

class EventsController {
    /**
     * 事件的 增删改查
     * @param ctx
     * @return {Promise<void>}
     */
    async addEvent(ctx) {
        const {
            name, description, content = null, tag1, tag2, tag3,
            tomorrow,
            op = null,
            id
        } = ctx.request.body;

        if (!content || !op) {
            errType.userParamsError.message = "缺少 content / op 参数";
            ctx.body = errType.userParamsError;
        } else {
            const result = await eventsS.addEvents(op, {
                name,
                description,
                content,
                tag1, tag2, tag3,
                tomorrow,
                id: id ? id : null
            }, ctx.state.user);
            if (result) {
                ctx.body = {
                    code: 200,
                    success: true,
                    message: `事件${op}`,
                    result
                };
            } else {
                ctx.body = errType.userParamsError;
            }
        }
    }

    /**
     * 获取事件
     * @param ctx
     * @return {Promise<void>}
     */
    async getEvents(ctx) {
        const {pageNum = 1, pageSize = 20} = ctx.request.query;
        const result = await eventsS.getEvents(pageNum, pageSize);
        ctx.body = {
            code: 200,
            success: true,
            message: "查询events数据",
            result
        };
    }

    // 获取指定事件详情
    async getEventDetailById(ctx) {
        const {id = 1} = ctx.request.body;
        const result = await eventsS.getEventsById(id);
        ctx.body = {
            code: 200,
            success: true,
            message: "查询events数据",
            result
        };
    }

    async getToDayEvents(ctx) {
        const {day = '2024-05-16'} = ctx.request.body;

        const result = await eventsS.getEventsByDayAndId(day, ctx.state.user.id);
        if (!result) {
            ctx.body = {
                code: 200,
                success: false,
                message: "今天还没有记录",
                result
            };
        } else {
            ctx.body = {
                code: 200,
                success: true,
                message: "查询events数据",
                result
            };
        }
    }

}

module.exports = new EventsController();
