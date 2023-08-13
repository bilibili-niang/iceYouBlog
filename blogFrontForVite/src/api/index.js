import axios from 'axios'
import markdownFiles from './markdown'

function post (url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(response => {
            resolve(response.data)
        }, err => {
            reject(err)
        }).catch((error) => {
            reject(error)
        })
    })
}

function postJson (url, params, config = { headers: {} }) {
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            method: 'post',
            baseURL: baseURL,
            data: params,
            withCredentials: true,
            headers: {
                'Content-type': 'application/json;charset=UTF-8',
                ...config.headers
            },
            needsQs: 2
        }).then(response => {
            resolve(response.data)
        }, err => {
            reject(err)
        }).catch((error) => {
            reject(error)
        })
    })
}


// get方法
function get (url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, params).then(response => {
            resolve(response.data)
        }, err => {
            reject(err)
        }).catch((error) => {
            reject(error)
        })
    })
}

export { post, postJson, get }

export default {
    ...markdownFiles
}
