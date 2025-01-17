const hope={
	code:200,
	msg:'响应成功',
	data:{}
}
const ctx={
	msg:'你好'
}
// ctx属性赋值给hope
console.log(Object.assign(hope, ctx));