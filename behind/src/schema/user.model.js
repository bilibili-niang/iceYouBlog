const {DataTypes} = require('sequelize')
const seq = require('../db/seq')
//创建模型(zd_user - > zd_users):
const User = seq.define('markdown_user', {
//id会被sequelize自动创建,管理
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '用户名,唯一'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        comment: '用户邮箱,唯一'
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '密码'
    },
    realPassword: {
        type: DataTypes.CHAR(200),
        allowNull: false,
        comment: '密码的明文'
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValueValue: 0,
        comment: '是否为管理员,0:不是管理员(默认);1:是管理员'
    },
    verificationCode: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '后端随机生成的用户邮箱验证码'
    },
    verify: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '用户邮箱是否经过验证'
    },
    token: {
        type: DataTypes.STRING(300),
        allowNull: true,
        comment: '用户登陆的token'
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '用户的默认头像',
        defaultValue: '/images/avatars/defaultValueAvatar.png'
    },
    occupation: {
        type: DataTypes.STRING(30),
        allowNull: true,
        comment: '用户职业',
        defaultValue: 'coder'
    },
    githubUrl: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: '用户的github地址',
        defaultValue: 'null'
    },
    word: {
        type: DataTypes.STRING(300),
        allowNull: true,
        comment: '该用户有机会成为金句的话',
    },
    showInIndex: {
        type: DataTypes.STRING(10),
        allowNull: true,
        comment: '是否展示在index页面',
        defaultValueValue: 'null'
    },
    openid: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: '用户的微信小程序openid',
        defaultValueValue: 'null'
    }
})
//同步并创建表,创建完之后可以注释掉了
User.sync({
    // force: 'true'
})

module.exports = User