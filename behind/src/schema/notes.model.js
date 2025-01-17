const {DataTypes} = require('sequelize')
const seq = require('../db/seq')
//创建模型(zd_user - > zd_users):
const notes = seq.define('markdown_notes', {
    note_title: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '笔记名字'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '用户邮箱,唯一'
    },
    allowView: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        comment: '是否允许其他用户查看',
        defaultValue: false
    },
    allowEdit: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        comment: '是否允许其他人编辑',
        defaultValue: false
    },
    allowComment: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        comment: '是否允许其他人评论',
        defaultValue: false
    },
    allowEditUserList: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '允许其他人编辑的用户email列表'
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: '笔记内容'
    },
    firstLevel: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
        comment: '是否为一级笔记'
    },
    secondLevel: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        comment: '是否为二级笔记'
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '笔记的icon',
        defaultValue: '/images/icon/default.png'
    },
    iconType: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '笔记的icon的类型'
    },
    commentId: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '笔记的评论数据的id列表'
    },
    cover: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '笔记的封面图片',
        defaultValue: '/images/cover/1.png'
    },
    childrenList: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '二级笔记的id列表'
    },
    fatherId: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '二级笔记的父级id'
    }
})
/*
User.sync({
	//如果数据库中存在该数据表,则会删除并建立
	force: 'true'
},{
timestamps:false
})
* */

//同步并创建表,创建完之后可以注释掉了
notes.sync({
    // force: 'true'
})

module.exports = notes