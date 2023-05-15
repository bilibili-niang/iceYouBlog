// 统一数字格式化
const filters = {
    // 时间格式化
    timeFormat: function (originVal) {
       /* console.log("originVal:")
        console.log(originVal)*/
        const dt = new Date(originVal)
        const y = dt.getFullYear()
        const m = (dt.getMonth() + 1 + '').padStart(2, '0')
        const d = (dt.getDate() + '').padStart(2, '0')
        const hh = (dt.getHours() + '').padStart(2, '0')
        const mm = (dt.getMinutes() + '').padStart(2, '0')
        const ss = (dt.getSeconds() + '').padStart(2, '0')
        // yyyy-mm-dd hh:mm:ss
        // console.log(`${y}-${m}-${d} ${hh}:${mm}:${ss}`)
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`

    }
}
export default filters;