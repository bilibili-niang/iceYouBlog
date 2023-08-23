const { ElNotification } = require('element-plus')
const { h } = require('vue')

class Function {
    alert = (msg, title = 'info') => {
        // iceMessage(msg)
        ElNotification({
            title: `${ title }`,
            message: h('i', { style: 'color: #7a7374' }, `${ msg }`),
        })
    }

    splice (str, length = 30) {
        if (!str) {
            return null
        }
        if (str.length > length) {
            return str.substring(0, length) + '...'
        } else {
            return str
        }
    }

    goTag (tag) {
        if (tag) {
            const url = '#/read/readTag?tag1=' + tag
            console.log(url)
        }
    }

}

module.exports = new Function()
