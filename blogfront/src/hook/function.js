import {iceMessage} from 'icepro'

class Function {
    alert = (msg, title = 'info') => {
        iceMessage(msg)
    }

    splice(str, length = 30) {
        if (!str) {
            return null
        }
        if (str.length > length) {
            return str.substring(0, length) + '...'
        } else {
            return str
        }
    }

    goTag(tag) {
        if (tag) {
            const url = '#/read/readTag?tag1=' + tag
            console.log(url)
        }
    }

}

export const alert = (msg, title = 'info') => {
    iceMessage(msg)
}

export const fun = {
    splice(str, length = 30) {
        if (!str) {
            return null
        }
        if (str.length > length) {
            return str.substring(0, length) + '...'
        } else {
            return str
        }
    },
    alert,
}
