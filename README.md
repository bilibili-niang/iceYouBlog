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

#### 项目功能说明

- blog增删改查
- note
- 存放代码片段
- search
- tag分类
- 文章的增删改查,点赞
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

#### 
