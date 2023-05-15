# iceYouBlog

#### 介绍
我写着玩的blog项目,基于nodejs和vue3

[演示地址](http://blog.icestone.top/#/)

#### 软件架构

##### 后端

- nodejs
- koa
- mysql

使用md5加盐加密,使用不同功能的middleware作为权限管理

后端api上使用controller,middleware,service三层

对于不同的报错信息进行统一管理

##### 前端

- vue3
- elementui plus
- bootstrap5

前端使用路由守卫进行权限管理

根据不同的一级路由懒加载不同的二级页面

对不同的功能组件进行封装

对不同的初始化数据使用mutations进行管理

#### 安装教程

##### 启动之前的准备:

- `behind`文件夹下`npm i`一下
- `behind/src/config/default.js`文件夹下是数据库的数据表名字和username,password等配置,启动项目之前请确认`database.name`中的数据库存在,且账户密码正确
- 服务器启动自动创建admin用户和第一条blog
- `npm run dev`后端启动成功,默认端口`89`

> 注意:

behind目录下为后端代码,`behind/src/static`中已有打包好的前端代码

blogfront目录下为前端代码,



#### 使用说明

- 默认启动后什么数据都没有,包括admin数据

#### api接口文档:

[在这](https://www.apifox.cn/apidoc/shared-156d6b82-1b42-4afd-9865-ac976cad0026)

想进行二次开发的(估计没人)看这里

#### 项目功能说明

- 文章的总览,分页/默认查看文章总览
  - 文章的阅读与评论,
    - 评论可以根据当前登录用户记录用户信息
    - 支持markdown评论
  - 文章的点赞与浏览量的记载
    - 根据当前登录用户记载该用户的浏览历史记录
  - 文章的tag记载
    - 最多支持三个tag,tag可以看做是分类依据,
    - 目前仅支持查询文章的tag,代码片段的tag分类正在开发中
- 阅读页面对登录用户识别,如果为文章拥有者,则可以进行编辑,
  - 在后端接收数据时会根据token进行用户权限管理
- 个人中心页面
  - 可以对自己的所有文章进行删除/tag未满三个的新增tag/恢复已删除的文章,查看历史记录
  - 编辑个人信息
    - 支持头像,职业等信息的更改
- 支持admin用户
  - admin用户可以有多个
  - 支持admin对所有文章的删除
  - 网站日志的查看
- 友链
  - 目前仅支持admin用户新增友链
  - 友链页面评论还在开发中





- 其他的还在开发...

#### 参与贡献

> 目前就我一个,想到什么有意思有写了

[个人网站](http://blog.icestone.top/#/)

[我写的往期文章](https://blog.csdn.net/ice_stone_kai?spm=1000.2115.3001.5113)

#### 鸣谢

- vue
- nodejs
- mysql
- koa
- elementui plus
- bootstrap5
- v-md-editor
- Apifox
- 等等我在项目中使用的包...
