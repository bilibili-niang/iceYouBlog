const path = require("path")
const multer = require("koa-multer");
const Jimp = require("jimp");
const { AVATAR_PATH, PICTURE_PATH } = require("../config/default");

// 处理头像上传
const avatarUpload = multer({
    dest: path.resolve(__dirname, AVATAR_PATH)
})

// 处理图片上传
const pictureUpload = multer({
    dest: path.resolve(__dirname, PICTURE_PATH)
})

// 处理用户头像
const avatarHandler = avatarUpload.single("avatar")


// 处理action动态头像
const pictureHandler = pictureUpload.array("picture")

// 处理图片大小
// 根据前端传入的w*h来确定图片的大小，这里就没有复杂处理，我们只做了大中小处理。
const pictureResizeHandler = async (ctx, next) => {
    const files = ctx.req.files;
    for (let file of files) {
        Jimp.read(file.path).then(image => {
            // 根据宽度，高度自适应
            image.resize(1280, Jimp.AUTO).write(`${file.path}-large`);
            image.resize(640, Jimp.AUTO).write(`${file.path}-middle`);
            image.resize(320, Jimp.AUTO).write(`${file.path}-small`);
        })
    }
    await next()
}

module.exports = {
    avatarHandler,
    pictureHandler,
    pictureResizeHandler
}