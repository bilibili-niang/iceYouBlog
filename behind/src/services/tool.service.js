const https = require('https');
const cheerio = require('cheerio');
const markdownFile = require('../schema/markdownFile');
const TurndownService = require('turndown');
const jwt = require('jsonwebtoken');
const {salt} = require('../config/default');
const {tokenNotExist} = require('../constant/err.type');
let turndownService = new TurndownService();

var option = {
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
};

class ToolService {
    async insertDataByUrl(option = {}) {
        console.log('option:')
        console.log(option)
        const url = option.url || '';
        if (url.length == 0) {
            console.log('url is null')
            return
        } else {
            console.log('url is not null')
            let html = '';
            let json = {};

            https.get(`${option.url}`, res => {
                res.on('data', function (chunk) {
                    html += chunk;
                });
                res.on('end', () => {
                    console.log(html)
                })
            });
        }
    }

    async updateDataByUrl(urlObj = {}) {
        console.log("urlObj:")
        console.log(urlObj)
        let html = '';

        https.get(urlObj.url, res => {
            res.on('data', function (chunk) {
                html += chunk;
            });
            res.on('end', () => {
                console.log("html:")
                console.log(html)
            })
        })
    }

    // 通过穿入的url将文章数据写入数据库
    async writeToDatabaseByUrl(url) {
        let config = {
            html: '', json: {}
        };
        let html = '';

        await https.get(url, (res) => {
            /*console.log('statusCode:', res.statusCode);
                        console.log('headers:', res.headers);*/
            res.on('data', function (chunk) {
                html += chunk;
            });

            res.on('end', (d) => {
                console.log('处理之前的html:')
                console.log(html)
                // 传入cheerio
                const $ = cheerio.load(html);
                const ele = $("#content_views");
                html = ele.html()
                html = turndownService.turndown(html)
                console.log('处理之后的')
                console.log(html);


            });

        }).on('error', (e) => {
            console.log('error:')
            console.error(e);
        });

    }

}

module.exports = new ToolService();