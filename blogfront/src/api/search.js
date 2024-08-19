import {get,post} from "@/api/request";

export default {
  // 通过tag和文章id返回相关文章
  async getHistory() {
    return post("/history/userAllSearchHistory");
  },
};