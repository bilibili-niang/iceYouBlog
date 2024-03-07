const event = require("../schema/events");
const {insertLog} = require("./log.service");
const markdownFile = require("../schema/markdownFile");
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
        return await event.update(params, params.id);
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

  async getEvents(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize;
    return await event.findAndCountAll({
      offset: offset,
      limit: pageSize * 1,
      where: {},
      order: [
        // 我们从要排序的模型开始排序数组
        ["id", "DESC"]
      ]
    });
  }
}

module.exports = new EventsService();
