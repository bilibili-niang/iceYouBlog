import { post } from "@/api/request";

export default {
  // @date 2023/6/7 , @author icestone
  // 传入email,返回该用户可以展示的信息
  async getUserInfoByEmail(data) {
    return await post("/user/getUserInfoByEmail", data);
  },
  /* @author icestone , 21:40
   * @date 2023/6/8
   * 获取传入email的所有文文章
   */
  async getUserAllMarkdownByEmail(data) {
    return await post("/markdownFile/getUserAllMarkdown", data);
  },
  // 注册
  async register(data) {
    return await post("/user/register", data);
  },
  async login(data) {
    return await post("/user/login", data);
  },
};
