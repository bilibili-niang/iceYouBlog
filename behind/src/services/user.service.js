const user = require('../schema/user.model')
const jwt = require("jsonwebtoken")
const {salt, md5Key} = require('../config/default')
const md5 = require("md5")
const image = require('../schema/image')
const comment = require('../schema/comment')

class UserService {
    /* @author icestone , 16:32
     * @date 2023/5/8
     *  初始化user
    */
    async initUserRes() {
        return await user.findOne({
            raw: true,
            where: {
                username: 'admin'
            }
        })
    }

    //用户创建
    /**
     * @param username
     * @param password
     * @param useremail
     * @returns {Promise<CreateOptions<Attributes<Model>> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<any, TModelAttributes>>}
     */
    async createUser(username, password, email, realPassword, openid) {
        // 创建token:
        const token = jwt.sign({
            username, email, avatar: '/images/avatars/defaultAvatar.png'
        }, salt, {
            //Token有效时间 单位s
            expiresIn: 60 * 60 * 100
        })
        return await user.create({
            username,
            password,
            realPassword,
            openid: openid ? openid : 'null',
            email,
            avatar: '/images/avatars/defaultAvatar.png',
            is_admin: 0,
            token
        }, {
            raw: true
        })
            .then(res => {
                console.log("res:")
                console.log(res)
            })
            .catch(e => {
                console.log("e:")
                console.log(e)
            })
    }

    /* @author icestone , 16:40
     * @date 2023/5/8
     *  创建admin用户
    */
    async initAdminUser() {
        const password = md5('admin' + md5Key)
        return await user.create({
            username: 'admin',
            password,
            realPassword: 'admin',
            email: 'adminEmail',
            avatar: '/images/avatars/defaultAvatar.png',
            is_admin: 1
        }, {
            raw: true
        })
    }

//	查询用户是否存在
    /**
     *
     * @param id
     * @param username
     * @param password
     * @param is_admin
     * @returns {Promise<*|null>}
     */
    async getUserInfo({id, username, password, is_admin}) {
        const whereOpt = {}
        id && Object.assign(whereOpt, {id})
        username && Object.assign(whereOpt, {username})
        password && Object.assign(whereOpt, {password})
        is_admin && Object.assign(whereOpt, {is_admin})
        const res = await user.findOne({
            attributes: ['id', 'email', 'username', 'password', 'is_admin', 'token', 'avatar', 'occupation', 'githubUrl', 'word'],
            where: whereOpt
        })
        return res ? res.dataValues : null
    }

    // 通过用户名返回用户信息
    async getUserInfoByName(username, attr = []) {
        return await user.findOne({
            where: {
                username
            }, raw: true
        })
    }

    // 通过name或email查找用户是否存在
    async findUserByUserNameOrUserEmail(username, email) {
        const res1 = await user.findAll({
            where: {
                username
            }, raw: true
        })
        const res2 = await user.findAll({
            where: {
                email
            }, raw: true
        })
        return {userName: res1.length, email: res2.length}
    }

    // 通过email查找用户信息:
    async getUserInfoByEmail(email, attrs = ['avatar']) {
        // const res = await user.findAll({
        return await user.findAll({
            attributes: attrs,
            where: {
                email
            }, raw: true
        })
    }

    // 更新用户token:
    async updateUserToken(email, token) {
        const resUserInf = await user.update({token}, {
            where: {
                email
            }
        })
        // 成功返回1
        return resUserInf
    }

    // 通过email获取user表中用户信息
    async getUserBaseInfo(email) {
        const res = await user.findOne({
            attributes: {exclude: ['password', 'verificationCode', 'verify', 'token', 'updatedAt']}, where: {
                email
            }, raw: true
        })
        return res
    }

    async getUserBaseInfoAndToken(email) {
        const res = await user.findOne({
            attributes: {exclude: ['password', 'verificationCode', 'verify', 'updatedAt']}, where: {
                email
            }, raw: true
        })
        return res
    }

    async updateUserInfo(id, form) {
        return await user.update({
            username: form.username, occupation: form.occupation, githubUrl: form.githubUrl, word: form.word,
        }, {
            where: {
                id
            }
        })
    }

    async updateUserAvatar(email, avatar) {
        return await user.update({
            avatar
        }, {
            where: {
                email
            }
        })
    }

    // 通过email更新用户头像
    async updateAvatarByEmail(email, imgpath) {
        return await user.update({
            avatar: imgpath,
        }, {
            where: {
                email
            }
        })
    }

    // 查询用户是否为admin
    async getUserisAdminByEmail(email) {
        const res = await user.findOne({
            where: {
                email
            },
            raw: true
        })
        console.log(res.is_admin)
        return res.is_admin == 0 ? false : true
    }

    /* @author icestone , 14:45
     * @date 2023/5/9
     *  通过传入的 id 查询用户信息
    */
    async getIsAdminById(username) {
        console.log(`传入的email:${username}`)
        /* @author icestone , 14:59
         * @date 2023/5/9
         *
         *  如果为admin:
         * [ { is_admin: 1 } ]
         *  如果不是admin:
         *
        */
        const res = await user.findAll({
            attributes: ['is_admin'],
            where: {
                username
            },
            raw: true
        })
        return Boolean(res[0].is_admin)
    }

    /* @author icestone , 16:50
     * @date 2023/5/11
     * 通过传入的 email 查询指定字段
    */
    async getUserInfoByEmail(email, attr = []) {
        return await user.findOne({
            attributes: attr,
            where: {
                email
            },
            raw: true
        })
    }

    /* @author icestone , 17:21
     * @date 2023/5/27
     *  根据email返回用户的头图
    */
    async getUserHeadImg(email) {
        // return await
        // return 'result'
        return await image.findAll({
            where: {
                email
            },
            raw: true
        })
    }

    /* @author icestone , 17:47
     * @date 2023/5/28
     *  通过email和图片路径写入 头图
    */
    async createHeadImgByEmail(email, url) {
        return await image.create({
                email, url
            }
        )
    }

    /* @author icestone , 14:45
     * @date 2023/6/4
     *  查询指定email发表的所有评论,默认查询type为blog的
    */
    async getUserAllComments(email, type = 'blog') {
        return await comment.findAll({
            where: {
                email,
                type
            },
            raw: true
        })
    }

// TODO openid 登录
    async loginByOpenId(params) {
        const res = await await user.findOne({
            raw: true,
            where: {
                openid: params?.openid
            }
        })
        return res
    }
}

module.exports = new UserService()
