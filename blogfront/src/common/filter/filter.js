// 统一数字格式化
export let numberUnify = data => {
    if (data) {
        return data.toLocaleString()
    } else {
        return data
    }
}

// 字符串大写
const stringUpperCase=(value)=>{
    if (!value) return ''
    value = value.toString()
    return value.toUpperCase()
}

// 统计字数
const wordCount=(str)=>{
    return [...str].length;
}

export default {
    stringUpperCase,
    wordCount
}

