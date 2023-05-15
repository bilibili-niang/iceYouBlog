const {
	sendVerification,
	sendVerificationByEmail
} = require('../controller/email.controller')


// const judge = Math.random().toString(36).slice(- 8)
// const judge = Math.random().toString(36)

// sendVerification('2714351312@qq.com', '测试', '这是测试的text区域', judge)

// sendVerification('2518089115@qq.com', '测试', '这是测试的text区域', judge)


sendVerification('2714351312@qq.com', '测试', '这是测试的text区域', '测试数据,这里是验证码')
sendVerificationByEmail('2714351312@qq.com', 'testcode')
