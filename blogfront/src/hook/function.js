const { ElNotification } = require('element-plus')
const { h } = require('vue')

class Function {
    alert = (msg, title = 'info') => {
        ElNotification({
            title: `${ title }`,
            message: h('i', { style: 'color: #7a7374' }, `${ msg }`),
        })
    }
}

module.exports = new Function()
