const fs = require('fs-extra');
const path = require('path')

// 定义源和目标路径
// 假设模板在 templates 文件夹中
const sourceDir = path.join(__dirname, 'templates')
// 复制到项目根目录
const targetDir = path.resolve(__dirname, '../..')

// 确保目标目录存在
fs.ensureDirSync(targetDir);

// 复制文件
fs.copySync(sourceDir, targetDir);