const errType = require('../constant/err.type')
const eventsS = require('../services/events.service')

class EventsController {
    /**
     * 事件的 增删改查
     * @param ctx
     * @return {Promise<void>}
     */
    async addEvent (ctx) {
        const {
            name, description, content = null, tag1, tag2, tag3,
            tomorrow,
            op = null,
            id
        } = ctx.request.body

        if (!content || !op) {
            errType.userParamsError.message = '缺少 content / op 参数'
            ctx.body = errType.userParamsError
        } else {
            const result = await eventsS.addEvents(op, {
                name,
                description,
                content,
                tag1, tag2, tag3,
                tomorrow,
                id: id ? id : null
            }, ctx.state.user)
            if (result) {
                ctx.body = {
                    code: 200,
                    success: true,
                    message: `事件${ op }`,
                    result
                }
            } else {
                ctx.body = errType.userParamsError
            }
        }
    }
}

module.exports = new EventsController()
