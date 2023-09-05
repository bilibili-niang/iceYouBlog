const https = require('https')
const cheerio = require('cheerio')
const TurndownService = require('turndown')
const fs = require('fs')
const { initUserRes, initAdminUser } = require('./user.service')
const { insertLog } = require('./log.service')
const { initMarkdownFile, createMarkdownFile } = require('./markdownFile.service')
let turndownService = new TurndownService()

const option = {
    rejectUnauthorized: false,
    hostname: 'blog.csdn.net',
    path: '/ice_stone_kai/article/details/110456464',
    headers: {
        'Accept': '*/*',
        //这里设置返回的编码方式 设置其他的会是乱码
        'Accept-Encoding': 'utf-8',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Connection': 'keep-alive',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
    }
}

class ToolService {
    async insertDataByUrl (option = {}) {
        console.log('option:')
        console.log(option)
        const url = option.url || ''
        if (url.length == 0) {
            console.log('url is null')
            return
        } else {
            console.log('url is not null')
            let html = ''
            let json = {}

            https.get(`${ option.url }`, res => {
                res.on('data', function (chunk) {
                    html += chunk
                })
                res.on('end', () => {
                    console.log(html)
                })
            })
        }
    }

    async updateDataByUrl (urlObj = {}) {
        console.log("urlObj:")
        console.log(urlObj)
        let html = ''

        https.get(urlObj.url, res => {
            res.on('data', function (chunk) {
                html += chunk
            })
            res.on('end', () => {
                console.log("html:")
                console.log(html)
            })
        })
    }

    // 通过穿入的url将文章数据写入数据库
    async writeToDatabaseByUrl (url) {
        let config = {
            html: '', json: {}
        }
        let html = ''

        await https.get(url, (res) => {
            /*console.log('statusCode:', res.statusCode);
                        console.log('headers:', res.headers);*/
            res.on('data', function (chunk) {
                html += chunk
            })

            res.on('end', (d) => {
                console.log('处理之前的html:')
                console.log(html)
                // 传入cheerio
                const $ = cheerio.load(html)
                const ele = $("#content_views")
                html = ele.html()
                html = turndownService.turndown(html)
                console.log('处理之后的')
                console.log(html)


            })

        }).on('error', (e) => {
            console.log('error:')
            console.error(e)
        })

    }

    /* @author 张嘉凯
     * @date 2023/6/21 @time 16:48
     * 移动文件 绝对路径,绝对路径
    */
    async removeFile (path, targetPath) {
        let flag = null
        await fs.rename(path, targetPath, (err) => {
            if (err) {
                flag = false
                console.log(err)
            } else {
                flag = true
            }
        })
        return flag
    }

    /* @author 张嘉凯
     * @date 2023/6/21 @time 17:19
     * 判断文件是否存在
    */

    /* 判断文件是否存在的函数
    *@path_way, 文件路径
     */
    async isFileExisted (path_way) {
        fs.access(path_way, (err) => {
            if (err) {
                return false
            } else {
                return true
            }
        })
    };

    /* @author 张嘉凯
     * @date 2023/6/30 @time 16:29
     *  判断文件名字是不是图片
    */
    checkImgType (name) {
        console.log('!/\\.(jpg|jpeg|png|GIF|JPG|PNG)$/.test(name)')
        console.log(!/\.(jpg|jpeg|png|GIF|JPG|PNG)$/.test(name))
        //用文件名name后缀判断文件类型，可用size属性判断文件大小不能超过500k ， 前端直接判断的好处，免去服务器的压力。
        if (!/\.(jpg|jpeg|png|GIF|JPG|PNG)$/.test(name)) {
            return false
        } else {
            return true
        }
    }

    // 从其中获取随机个数据,并返回数组
    getLimitIds (arr, count) {
        let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index   //只是声明变量的方式, 也可以分开写
        while (i -- > min) {
            //这里的+1 是因为上面i--的操作  所以要加回来
            index = Math.floor(( i + 1 ) * Math.random())
            //即值交换
            temp = shuffled[index]
            shuffled[index] = shuffled[i]
            shuffled[i] = temp
        }
        const ids = shuffled.slice(min)
        return ids.map(item => {
            return item.id
        })
    }

    /**
     * 服务启动时的数据库初始化
     */
    async initDataBase (fileNameAndPath, date) {
        // @date 2023/5/8 , @author icestone
        //  获取username为admin的信息,如果没有,说明不存在,需要创建一个,并为其赋值
        const userRes = await initUserRes()
        if (userRes == null) {
            console.log(initAdminUser())
            await insertLog({
                time: date,
                ip: 'localhost',
                logType: 'database init',
                detail: 'User 数据库初始化了一下',
                userId: 'root',
                fileNameAndPath
            })
        } else {
            console.log('User 不用初始化')
        }

        // @date 2023/5/8 , @author icestone
        //  初始化文章
        const markdownFileRes = await initMarkdownFile()
        /*console.log('markdownFileRes')
        console.log(markdownFileRes)*/
        /**
         * 如果没有文章,则创建一个
         */
        if (markdownFileRes == null) {
            await createMarkdownFile('adminEmail', {
                title: 'Hello World',
                description: '',
                tag1: 'tag1',
                tag2: 'tag2',
                tag3: 'tag3',
                audit: '1',
                content: `> hello world!`
            })
            await insertLog({
                time: date,
                ip: 'localhost',
                logType: 'database init',
                detail: 'markdownFile get init',
                userId: 'root',
                fileNameAndPath
            })
        } else {
            console.log('markdownFile No initialization is required')
        }

    }

}

module.exports = new ToolService()
