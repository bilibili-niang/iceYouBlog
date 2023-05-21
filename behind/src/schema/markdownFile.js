const {DataTypes} = require('sequelize')
const seq = require('../db/seq')
const markdownFile = seq.define('markdownFile', {
//id会被sequelize自动创建,管理
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '拥有者邮箱',
        defaultValue: 'adminEmail'
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '文章名称'
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '文章内容'
    },
    states: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '0',
        comment: '文章的状态'
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '文章的描述'
    },
    praise: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '文章的点赞数量'
    },
    view: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '0',
        comment: '文章的浏览量'
    },
    audit: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '文章的审核,1通过,0未通过',
        defaultValue: '1'
    },
    tag1: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '文章的标签1'
    },
    tag2: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '文章的标签2'
    },
    tag3: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '文章的标签3'
    },
    source: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '文章来源,如果是来自于其他王章,则从其他网站上爬取'
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    headImg: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '文章自定义头图,如果没有则会加载默认,是否使用默认由前端来判断',
        defaultValue: '/images/headImg/defaultHeadImg.png'
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '文章类型,默认为blog',
        defaultValue: 'blog'
    },
    hasOriginal: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '是否有源头',
        defaultValue: 'blog'
    },
    diggCount: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '点赞数量',
        defaultValue: '0'
    },
    articleType: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '文章类型',
        defaultValue: 'blog'
    },
    recommendLevel:{
        type: DataTypes.STRING,
        allowNull: true,
        comment: '文章置顶等级',
        defaultValue: '0'
    }
}, {
    paranoid: true,
// If you want to give a custom name to the deletedAt column
    deletedAt: 'destroyTime'
})

//同步并创建表,创建完之后可以注释掉了
//自动创建之后会在该表的后面加上s
//如果数据库中存在该数据表,则会删除并建立
markdownFile.sync({
    // force: 'true'
})
module.exports = markdownFile

