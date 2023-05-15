// 统一数字格式化
export let numberUnify = data => {
    if (data) {
        return data.toLocaleString()
    } else {
        return data
    }
}

// 字符串大写
export let stringUpperCase = value => {
    console.log(value)
    console.log("stringUpperCase")
    if (!value) return ''
    value = value.toString()
    return value.toUpperCase()
}

