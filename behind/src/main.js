const app = require("./app");
// 这里只用引入server的配置
const {server} = require("./config/default");
const {insertLog} = require("./services/log.service");
const {
  initMarkdownFile,
  createMarkdownFile
} = require("./services/markdownFile.service");
const {
  initUserRes,
  initAdminUser
} = require("./services/user.service");

const fileNameAndPath = __filename;
let date = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, " ").replace(/\.[\d]{3}Z/, "");

/* @author icestone , 16:20
 * @date 2023/5/8
 *  通过数据查询初始化一些数据库
*/
async function initDataBase() {
  // @date 2023/5/8 , @author icestone
  //  获取username为admin的信息,如果没有,说明不存在,需要创建一个,并为其赋值
  const userRes = await initUserRes();
  if (userRes == null) {
    insertLog({
      time: date,
      ip: "localhost",
      logType: "database init",
      detail: "User 数据库初始化了一下",
      userId: "root",
      fileNameAndPath
    });
  } else {
    console.log("User 不用初始化");
  }

  // @date 2023/5/8 , @author icestone
  //  初始化文章
  const markdownFileRes = await initMarkdownFile();
  /**
   * 如果没有文章,则创建一个
   */
  if (markdownFileRes == null) {
    await createMarkdownFile("adminEmail", {
      title: "Hello World",
      description: "",
      tag1: "tag1",
      tag2: "tag2",
      tag3: "tag3",
      audit: "1",
      content: `> hello world!`
    });
    await insertLog({
      time: date,
      ip: "localhost",
      logType: "database init",
      detail: "markdownFile get init",
      userId: "root",
      fileNameAndPath
    });
  } else {
    // 指定数据库不为空,不用输出信息
    // console.log('markdownFile No initialization is required')
  }
}

app.listen(server.port, async () => {
  // @date 2023/5/8 , @author icestone
  //  这里需要初始化确认一下数据库
  await initDataBase();
  await insertLog({
    time: date,
    ip: "localhost",
    logType: "server start",
    detail: "服务器启动",
    userId: "root",
    fileNameAndPath
  });
  console.log(`server is running at 127.0.0.1:${server.port}`);
});
